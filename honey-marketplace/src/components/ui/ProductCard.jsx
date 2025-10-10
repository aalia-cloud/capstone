import React from 'react';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { ShoppingCart, Eye, Award } from 'lucide-react';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onViewDetails,
  className = "" 
}) => {
  const {
    name,
    price,
    image,
    origin,
    harvestSeason,
    quality,
    description,
    hasNFT = true,
    inStock = true
  } = product;

  return (
    <Card className={`product-card group cursor-pointer ${className}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* NFT Badge */}
        {hasNFT && (
          <Badge className="nft-badge absolute top-3 right-3">
            <Award className="w-3 h-3 mr-1" />
            NFT
          </Badge>
        )}
        
        {/* Stock Status */}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {origin}
            </span>
            <span>•</span>
            <span>{harvestSeason}</span>
            <span>•</span>
            <span className="font-medium text-primary">{quality}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold honey-gradient-text">
            ${price}
          </span>
          <span className="text-xs text-muted-foreground">
            + NFT Certificate
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(product);
            }}
            className="smooth-hover"
          >
            <Eye className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            disabled={!inStock}
            className="smooth-hover"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

