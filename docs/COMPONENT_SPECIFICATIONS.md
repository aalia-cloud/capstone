# BeeSure Component Specifications

## 🎯 Detailed Component Mockups

### **Product Card Component**

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────────┐ │
│  │                                 │ │
│  │        Product Image            │ │ 280px × 200px
│  │      (Honey jar photo)          │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─ NFT ─┐  ┌─ Organic ─┐          │ │ Badges: 8px spacing
│  └───────┘  └───────────┘          │ │
│                                     │
│  Wildflower Honey                   │ │ Title: text-lg, font-semibold
│  Mountain Meadows Apiary            │ │ Origin: text-sm, muted
│                                     │
│  ★★★★★ 4.8 (156 reviews)           │ │ Rating: text-sm
│                                     │
│  $22.00                    500g     │ │ Price: text-xl, font-bold
│                                     │
│  ┌─────── Add to Cart ──────────┐   │ │ Button: primary, full-width
│  └───────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Card Size**: 320px × 420px
- **Padding**: 20px all sides
- **Border Radius**: 12px
- **Shadow**: 0 4px 6px rgba(0,0,0,0.1)
- **Hover Effect**: Lift with increased shadow
- **Image Aspect Ratio**: 4:3

### **Header Navigation Component**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🍯 BeeSure    Home  Marketplace  Trace  About  Contact    🔍 [Search...]   │
│                                                                              │
│                                              🛒(2)  💰Connect  👤 Profile   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Desktop Layout (1440px):**
- **Height**: 64px
- **Logo**: Left-aligned, 32px height
- **Navigation**: Center-aligned, 16px spacing between items
- **Actions**: Right-aligned, 12px spacing between items
- **Search**: 300px width, expandable on focus

**Mobile Layout (375px):**
```
┌─────────────────────────────────────┐
│  ☰  🍯 BeeSure           🛒(2)  👤  │
└─────────────────────────────────────┘
```

### **Admin Dashboard Stats Cards**

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  📦 Total Products  │  │  👥 Total Users     │  │  🛒 Total Orders    │
│                     │  │                     │  │                     │
│       156           │  │       1,234         │  │       89            │
│                     │  │                     │  │                     │
│  ↗ +12% from last   │  │  ↗ +23% from last   │  │  ↗ +18% from last   │
│     month           │  │     month           │  │     month           │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

**Specifications:**
- **Card Size**: 280px × 140px
- **Padding**: 24px
- **Icon Size**: 20px × 20px
- **Number**: text-3xl, font-bold
- **Growth**: text-sm, with trend icon

### **Product Management Table**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☐ Select All    🔍 Search products...    📂 Category ▼    📊 Sort ▼        │
├─────────────────────────────────────────────────────────────────────────────┤
│  ☐  🖼️  Wildflower Honey        $22.00   67 units   ⭐4.7   📝✏️🗑️        │
│  ☐  🖼️  Manuka Honey            $85.00   12 units   ⭐4.9   📝✏️🗑️        │
│  ☐  🖼️  Acacia Honey            $30.00   32 units   ⭐4.9   📝✏️🗑️        │
│  ☐  🖼️  Raw Honeycomb           $40.00   18 units   ⭐5.0   📝✏️🗑️        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Row Height**: 72px
- **Image**: 48px × 48px, rounded
- **Checkbox**: 16px × 16px
- **Actions**: Icon buttons, 32px × 32px each

### **Login Form Component**

```
┌─────────────────────────────────────┐
│              🍯 BeeSure             │
│         Sign in to your account     │
│                                     │
│  Email                              │
│  ┌─────────────────────────────────┐ │
│  │ Enter your email                │ │
│  └─────────────────────────────────┘ │
│                                     │
│  Password                           │
│  ┌─────────────────────────────────┐ │
│  │ Enter your password         👁️  │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌────────── Sign In ─────────────┐  │
│  └─────────────────────────────────┘  │
│                                     │
│  Demo Credentials:                  │
│  ┌─Admin─┐  ┌─Customer─┐            │
│  └───────┘  └─────────┘            │
└─────────────────────────────────────┘
```

**Specifications:**
- **Form Width**: 400px (desktop), 100% (mobile)
- **Input Height**: 48px
- **Button Height**: 48px
- **Spacing**: 16px between form elements

### **Product Detail Page Layout**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Home > Marketplace > Wildflower Honey                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                     │                                       │
│  ┌─────────────────────────────────┐ │  Wildflower Honey                     │
│  │                                 │ │  Mountain Meadows Apiary              │
│  │        Main Product             │ │                                       │
│  │         Image                   │ │  ★★★★★ 4.7 (156 reviews)             │
│  │       600×400px                 │ │                                       │
│  │                                 │ │  $22.00                               │
│  └─────────────────────────────────┘ │                                       │
│                                     │  ┌─ Organic ─┐ ┌─ NFT Certified ─┐    │
│  [🖼️] [🖼️] [🖼️] [🖼️]              │  └───────────┘ └─────────────────┘    │
│                                     │                                       │
│                                     │  Quantity: [1] ▼                      │
│                                     │                                       │
│                                     │  ┌──── Add to Cart ────┐              │
│                                     │  └─────────────────────┘              │
│                                     │                                       │
│                                     │  🔗 View NFT Certificate              │
│                                     │  🔍 Verify Authenticity               │
├─────────────────────────────────────────────────────────────────────────────┤
│  📝 Description    🧪 Quality Tests    📦 Shipping    ⭐ Reviews            │
│                                                                             │
│  Complex flavor profile from diverse wildflower sources...                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **Mobile Product Card (Responsive)**

```
┌─────────────────────────────┐
│  ┌─────────────────────────┐ │
│  │     Product Image       │ │
│  │      280×200px          │ │
│  └─────────────────────────┘ │
│                             │
│  Wildflower Honey           │
│  Mountain Meadows           │
│                             │
│  ★★★★★ 4.7 (156)           │
│                             │
│  $22.00            500g     │
│                             │
│  ┌─── Add to Cart ───┐      │
│  └───────────────────┘      │
└─────────────────────────────┘
```

**Mobile Specifications:**
- **Card Width**: 100% (with 16px margins)
- **Image Height**: 200px
- **Touch Target**: Minimum 44px height

### **Filter Sidebar Component**

```
┌─────────────────────────┐
│  🎛️ Filters    Clear All │
├─────────────────────────┤
│                         │
│  Category               │
│  ┌─ All Categories ─▼─┐ │
│  └─────────────────────┘ │
│                         │
│  Quality Grade          │
│  ┌─ All Qualities ──▼─┐ │
│  └─────────────────────┘ │
│                         │
│  Price Range            │
│  $0 ────●──────── $100  │
│                         │
│  ☐ In Stock Only        │
│  ☐ NFT Certified Only   │
│                         │
│  ┌─── Apply Filters ──┐ │
│  └────────────────────┘ │
└─────────────────────────┘
```

**Specifications:**
- **Sidebar Width**: 280px (desktop)
- **Mobile**: Full-width drawer overlay
- **Spacing**: 16px between filter groups

### **Admin Sidebar Navigation**

```
┌─────────────────────────┐
│  🍯 BeeSure             │
│     Admin Panel         │
├─────────────────────────┤
│                         │
│  📊 Dashboard           │
│  📦 Products            │
│  👥 Users               │
│  📈 Analytics           │
│  ⚙️  Settings           │
│                         │
├─────────────────────────┤
│  Quick Actions          │
│  📦 Add Product         │
│  🏠 View Marketplace    │
│                         │
├─────────────────────────┤
│  👤 Admin User          │
│     admin@beesure.com   │
│     [Admin]             │
└─────────────────────────┘
```

**Specifications:**
- **Sidebar Width**: 280px
- **Item Height**: 40px
- **Active State**: Primary background color
- **Hover State**: Muted background

## 🎨 Visual Design Details

### **Color Usage Examples**

#### **Primary Actions**
- Add to Cart buttons: Primary gold (#F59E0B)
- Login/Submit buttons: Primary gold
- Active navigation: Primary gold

#### **Secondary Actions**
- View Details: Secondary amber (#D97706)
- Edit buttons: Secondary amber
- Filter buttons: Secondary amber

#### **Success States**
- In Stock badges: Accent green (#059669)
- Success notifications: Accent green
- Verified badges: Accent green

#### **Status Indicators**
- Out of Stock: Error red (#EF4444)
- Warnings: Warning orange (#F59E0B)
- Info badges: Info blue (#3B82F6)

### **Typography in Context**

#### **Headings**
- Page titles: Playfair Display, 48px, bold
- Section titles: Playfair Display, 30px, semibold
- Card titles: Inter, 20px, semibold

#### **Body Text**
- Product descriptions: Inter, 16px, normal
- Labels: Inter, 14px, medium
- Captions: Inter, 12px, normal

### **Spacing Examples**

#### **Component Spacing**
- Between cards: 24px
- Between sections: 48px
- Form element spacing: 16px
- Button padding: 12px 24px

#### **Layout Spacing**
- Page margins: 32px (desktop), 16px (mobile)
- Container padding: 24px
- Section padding: 64px vertical

This specification provides detailed mockups and measurements that can be used to create accurate Figma designs or implement the components directly in code.
