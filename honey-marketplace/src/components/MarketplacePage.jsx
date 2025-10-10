import React, { useState, useEffect, useCallback } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import Header from './ui/Header';
import ProductCard from './ui/ProductCard';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  MapPin,
  Star,
  Award,
  Leaf,
  Calendar,
  DollarSign,
  Package,
  ChevronDown,
  X
} from 'lucide-react';

// Extended sample products for marketplace (fallback data)
// eslint-disable-next-line no-unused-vars
const sampleProducts = [
  {
    id: 1,
    name: "Mint Blossom Honey",
    price: 25,
    image: "/src/assets/anNLvZ16TeG7.jpg",
    origin: "Al Dhafra Apiary",
    harvestSeason: "Spring 2024",
    quality: "Organic",
    description: "Refreshing minty flavor with delicate floral notes. Perfect for tea and desserts.",
    hasNFT: true,
    inStock: true,
    rating: 4.8,
    reviews: 124,
    category: "Floral",
    weight: "500g",
    pricePerKg: 50
  },
  {
    id: 2,
    name: "Acacia Honey",
    price: 30,
    image: "/src/assets/D5ZGzxW0P3i3.jpg",
    origin: "Bee Farm #5",
    harvestSeason: "Summer 2024",
    quality: "Grade A",
    description: "Delicate, lightly sweet taste with subtle floral undertones.",
    hasNFT: true,
    inStock: true,
    rating: 4.9,
    reviews: 89,
    category: "Floral",
    weight: "500g",
    pricePerKg: 60
  },
  {
    id: 3,
    name: "Raw Honeycomb",
    price: 40,
    image: "/src/assets/UmwNcmqldblm.jpg",
    origin: "Al Dhafra Apiary",
    harvestSeason: "Spring 2024",
    quality: "Premium",
    description: "Rich floral aroma with natural caramel notes. Straight from the hive.",
    hasNFT: true,
    inStock: true,
    rating: 5.0,
    reviews: 67,
    category: "Raw",
    weight: "300g",
    pricePerKg: 133
  },
  {
    id: 4,
    name: "Wildflower Honey",
    price: 22,
    image: "/src/assets/aV3WMp6rvvkb.jpg",
    origin: "Mountain Meadows",
    harvestSeason: "Summer 2024",
    quality: "Organic",
    description: "Complex flavor profile from diverse wildflower sources.",
    hasNFT: true,
    inStock: true,
    rating: 4.7,
    reviews: 156,
    category: "Wildflower",
    weight: "500g",
    pricePerKg: 44
  },
  {
    id: 5,
    name: "Manuka Honey",
    price: 85,
    image: "/src/assets/CQt9kOxky7QR.jpg",
    origin: "New Zealand Farms",
    harvestSeason: "Spring 2024",
    quality: "Premium",
    description: "Rare Manuka honey with exceptional antibacterial properties.",
    hasNFT: true,
    inStock: true,
    rating: 4.9,
    reviews: 203,
    category: "Medicinal",
    weight: "250g",
    pricePerKg: 340
  },
  {
    id: 6,
    name: "Clover Honey",
    price: 18,
    image: "/src/assets/E09YjvUNs8AL.jpg",
    origin: "Prairie Bee Co.",
    harvestSeason: "Summer 2024",
    quality: "Grade A",
    description: "Classic mild and sweet clover honey, perfect for everyday use.",
    hasNFT: false,
    inStock: true,
    rating: 4.5,
    reviews: 98,
    category: "Floral",
    weight: "500g",
    pricePerKg: 36
  },
  {
    id: 7,
    name: "Lavender Honey",
    price: 35,
    image: "/src/assets/dxnCnOdsg3Id.jpg",
    origin: "Provence Fields",
    harvestSeason: "Summer 2024",
    quality: "Organic",
    description: "Aromatic lavender honey with calming floral notes.",
    hasNFT: true,
    inStock: false,
    rating: 4.8,
    reviews: 142,
    category: "Floral",
    weight: "350g",
    pricePerKg: 100
  },
  {
    id: 8,
    name: "Buckwheat Honey",
    price: 28,
    image: "/src/assets/pSpYZBrQtoC3.jpeg",
    origin: "Northern Harvest",
    harvestSeason: "Fall 2024",
    quality: "Grade A",
    description: "Dark, robust honey with molasses-like flavor and high antioxidants.",
    hasNFT: true,
    inStock: true,
    rating: 4.6,
    reviews: 87,
    category: "Dark",
    weight: "500g",
    pricePerKg: 56
  }
];

const MarketplacePage = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [nftOnly, setNftOnly] = useState(false);

  // Get unique values for filters
  const categories = [...new Set(products.map(p => p.category))];
  const qualities = [...new Set(products.map(p => p.quality))];
  const origins = [...new Set(products.map(p => p.origin))];

  const filterProducts = useCallback(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.origin.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesQuality = selectedQuality === 'all' || product.quality === selectedQuality;
      const matchesOrigin = selectedOrigin === 'all' || product.origin === selectedOrigin;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !inStockOnly || product.inStock;
      const matchesNFT = !nftOnly || product.hasNFT;

      return matchesSearch && matchesCategory && matchesQuality && 
             matchesOrigin && matchesPrice && matchesStock && matchesNFT;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedQuality, selectedOrigin, priceRange, inStockOnly, nftOnly, sortBy]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Added to cart:', product);
  };

  const handleViewDetails = (product) => {
    console.log('View details:', product);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    console.log('Wallet connection toggled');
  };

  const handleScanBarcode = () => {
    console.log('Scan barcode clicked');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedQuality('all');
    setSelectedOrigin('all');
    setPriceRange([0, 100]);
    setInStockOnly(false);
    setNftOnly(false);
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isWalletConnected={isWalletConnected}
        onConnectWallet={handleConnectWallet}
        onProfileClick={() => console.log('Profile clicked')}
        onScanBarcode={handleScanBarcode}
      />

      {/* Marketplace Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold mb-4">Honey Marketplace</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium honey from verified apiaries worldwide. Each product comes with 
              blockchain certification and complete traceability.
            </p>
          </div>

          {/* Search and Quick Stats */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search honey products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-6 text-sm text-muted-foreground">
              <div className="text-center">
                <div className="font-semibold text-foreground">{filteredProducts.length}</div>
                <div>Products</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{origins.length}</div>
                <div>Apiaries</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{filteredProducts.filter(p => p.hasNFT).length}</div>
                <div>NFT Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quality Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Quality Grade</label>
                  <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Qualities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Qualities</SelectItem>
                      {qualities.map(quality => (
                        <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Origin Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Origin</label>
                  <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Origins" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Origins</SelectItem>
                      {origins.map(origin => (
                        <SelectItem key={origin} value={origin}>{origin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Special Filters */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="inStock" className="text-sm">In Stock Only</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="nftOnly"
                      checked={nftOnly}
                      onChange={(e) => setNftOnly(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="nftOnly" className="text-sm">NFT Certified Only</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
