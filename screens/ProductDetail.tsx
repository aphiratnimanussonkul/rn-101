import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react-native';
import { Product } from '../types/product';

const { width: screenWidth } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params as { product: Product };
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBuyNow = () => {
    Alert.alert('Purchase', 'Redirecting to checkout...');
  };

  const formatPrice = (price: string, priceSign: string) => {
    if (!price || price === '0.0') return 'Price not available';
    return `${priceSign || '$'}${price}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={toggleFavorite}>
          <Heart
            size={24}
            color={isFavorite ? '#E8B4B8' : '#6B7280'}
            fill={isFavorite ? '#E8B4B8' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.api_featured_image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand || 'Unknown Brand'}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>
            {formatPrice(product.price, product.price_sign)}
          </Text>

          {product.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
              <Text style={styles.ratingText}>Customer Rating</Text>
            </View>
          )}

          {/* Color Swatches */}
          {product.product_colors && product.product_colors.length > 0 && (
            <View style={styles.colorsSection}>
              <Text style={styles.sectionTitle}>Available Colors</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.colorsList}
              >
                {product.product_colors.map((color, index) => (
                  <View key={index} style={styles.colorItem}>
                    <View
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: color.hex_value || '#E5E7EB' },
                      ]}
                    />
                    <Text style={styles.colorName} numberOfLines={1}>
                      {color.colour_name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Description */}
          {product.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {/* Product Type & Category */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryLabel}>Type:</Text>
              <Text style={styles.categoryValue}>
                {product.product_type?.replace('_', ' ') || 'N/A'}
              </Text>
            </View>
            {product.category && (
              <View style={styles.categoryRow}>
                <Text style={styles.categoryLabel}>Category:</Text>
                <Text style={styles.categoryValue}>{product.category}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={toggleFavorite}
        >
          <Heart
            size={24}
            color={isFavorite ? '#E8B4B8' : '#6B7280'}
            fill={isFavorite ? '#E8B4B8' : 'transparent'}
          />
          <Text
            style={[
              styles.wishlistButtonText,
              isFavorite && styles.wishlistButtonTextActive,
            ]}
          >
            {isFavorite ? 'In Wishlist' : 'Add to Wishlist'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <ShoppingBag size={24} color="#FFFFFF" />
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: '#FFFFFF',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -20,
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E8B4B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  productName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 36,
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F59E0B',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  colorsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  colorsList: {
    flexDirection: 'row',
  },
  colorItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 60,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  colorName: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  descriptionSection: {
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    width: 80,
  },
  categoryValue: {
    fontSize: 16,
    color: '#374151',
    textTransform: 'capitalize',
    flex: 1,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 16,
  },
  wishlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E8B4B8',
    backgroundColor: '#FFFFFF',
  },
  wishlistButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  wishlistButtonTextActive: {
    color: '#E8B4B8',
  },
  buyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#E8B4B8',
  },
  buyButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
