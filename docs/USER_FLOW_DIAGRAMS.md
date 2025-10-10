# BeeSure User Flow Diagrams

## 🛍️ Customer Shopping Journey

### **Primary Shopping Flow**

```mermaid
graph TD
    A[Landing Page] --> B{First Time Visitor?}
    B -->|Yes| C[Browse Featured Products]
    B -->|No| D[Direct to Marketplace]
    
    C --> E[View Product Details]
    D --> E
    
    E --> F{Interested in Product?}
    F -->|Yes| G[Add to Cart]
    F -->|No| H[Continue Browsing]
    
    G --> I{Ready to Checkout?}
    I -->|Yes| J[Proceed to Checkout]
    I -->|No| H
    
    H --> K[Apply Filters/Search]
    K --> E
    
    J --> L{User Logged In?}
    L -->|No| M[Login/Register]
    L -->|Yes| N[Review Cart]
    
    M --> N
    N --> O[Enter Shipping Info]
    O --> P[Select Payment Method]
    P --> Q[Review Order]
    Q --> R[Complete Payment]
    R --> S[Order Confirmation]
    S --> T[Email Receipt]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style S fill:#9f9,stroke:#333,stroke-width:2px
```

### **Product Discovery Flow**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Landing Page  │───▶│   Marketplace   │───▶│ Product Detail  │
│                 │    │                 │    │                 │
│ • Hero Section  │    │ • Product Grid  │    │ • Image Gallery │
│ • Featured      │    │ • Filters       │    │ • Description   │
│ • Trust Badges  │    │ • Search        │    │ • NFT Info      │
│ • CTA Buttons   │    │ • Sorting       │    │ • Reviews       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Newsletter      │    │ Category Pages  │    │ Add to Cart     │
│ Signup          │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Authentication Flow**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Guest User      │───▶│ Login Required  │───▶│ Login Page      │
│                 │    │                 │    │                 │
│ • Browse freely │    │ • Checkout      │    │ • Email/Pass    │
│ • Add to cart   │    │ • Save items    │    │ • Demo creds    │
│ • View products │    │ • User profile  │    │ • Register link │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Registration    │    │ Authenticated   │
                       │                 │    │                 │
                       │ • User details  │    │ • Full access   │
                       │ • Email verify  │    │ • Order history │
                       │ • Welcome msg   │    │ • Saved items   │
                       └─────────────────┘    └─────────────────┘
```

## 👨‍💼 Admin Management Workflows

### **Admin Dashboard Flow**

```mermaid
graph TD
    A[Admin Login] --> B[Dashboard Overview]
    B --> C{Choose Action}
    
    C -->|Manage Products| D[Product Management]
    C -->|Manage Users| E[User Management]
    C -->|View Analytics| F[Analytics Dashboard]
    C -->|Settings| G[System Settings]
    
    D --> D1[View Product List]
    D1 --> D2{Product Action}
    D2 -->|Add New| D3[Create Product Form]
    D2 -->|Edit| D4[Edit Product Form]
    D2 -->|Delete| D5[Confirm Deletion]
    D2 -->|Bulk Actions| D6[Select Multiple]
    
    D3 --> D7[Save Product]
    D4 --> D7
    D7 --> D8[Success Notification]
    D8 --> D1
    
    E --> E1[View User List]
    E1 --> E2{User Action}
    E2 -->|Change Role| E3[Update User Role]
    E2 -->|Deactivate| E4[Confirm Action]
    E2 -->|View Details| E5[User Profile]
    
    F --> F1[Revenue Charts]
    F --> F2[Customer Insights]
    F --> F3[Product Performance]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style D8 fill:#9f9,stroke:#333,stroke-width:2px
```

### **Product Management Workflow**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Product List    │───▶│ Add New Product │───▶│ Product Form    │
│                 │    │                 │    │                 │
│ • Search/Filter │    │ • Click Add     │    │ • Name/Price    │
│ • Sort Options  │    │ • Quick Action  │    │ • Description   │
│ • Bulk Select   │    │                 │    │ • Images        │
│ • Actions Menu  │    │                 │    │ • Categories    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         ▼                                              ▼
┌─────────────────┐                          ┌─────────────────┐
│ Edit Product    │                          │ Form Validation │
│                 │                          │                 │
│ • Pre-filled    │◀─────────────────────────│ • Required      │
│ • Same form     │                          │ • Format check  │
│ • Update mode   │                          │ • Error display │
└─────────────────┘                          └─────────────────┘
         │                                              │
         ▼                                              ▼
┌─────────────────┐                          ┌─────────────────┐
│ Save Changes    │                          │ Success State   │
│                 │─────────────────────────▶│                 │
│ • API call      │                          │ • Notification  │
│ • Loading state │                          │ • Redirect      │
└─────────────────┘                          └─────────────────┘
```

### **User Role Management Flow**

```
Admin Dashboard
       │
       ▼
┌─────────────────┐
│ User Management │
│                 │
│ • User List     │
│ • Role Filters  │
│ • Search Users  │
└─────────────────┘
       │
       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Select User     │───▶│ Actions Menu    │───▶│ Role Change     │
│                 │    │                 │    │                 │
│ • Click user    │    │ • Make Admin    │    │ • Confirmation  │
│ • View profile  │    │ • Remove Admin  │    │ • Update role   │
│ • Check details │    │ • Deactivate    │    │ • Notify user   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Authentication & Authorization Flows

### **Role-Based Access Control**

```
┌─────────────────┐
│ User Login      │
│                 │
│ • Email/Pass    │
│ • Validate      │
│ • Check role    │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Role Detection  │
│                 │
│ • Admin?        │
│ • Customer?     │
│ • Guest?        │
└─────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌─────────┐
│ Admin   │ │Customer │
│ Access  │ │ Access  │
│         │ │         │
│ • Full  │ │ • Shop  │
│ • CRUD  │ │ • View  │
│ • Users │ │ • Cart  │
│ • Stats │ │ • Order │
└─────────┘ └─────────┘
```

### **Protected Route Flow**

```
User Navigates to /admin
         │
         ▼
┌─────────────────┐
│ Check Auth      │
│                 │
│ • Token valid?  │
│ • User exists?  │
└─────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌─────────┐
│ Logged  │ │ Not     │
│ In      │ │ Logged  │
└─────────┘ └─────────┘
    │           │
    ▼           ▼
┌─────────┐ ┌─────────┐
│ Check   │ │Redirect │
│ Role    │ │to Login │
└─────────┘ └─────────┘
    │
┌───┴───┐
▼       ▼
┌─────┐ ┌─────┐
│Admin│ │User │
│Allow│ │Deny │
└─────┘ └─────┘
```

## 🛒 E-commerce Transaction Flow

### **Checkout Process**

```
Shopping Cart
     │
     ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Review Cart     │───▶│ User Info       │───▶│ Shipping Info   │
│                 │    │                 │    │                 │
│ • Items list    │    │ • Login check   │    │ • Address       │
│ • Quantities    │    │ • Guest option  │    │ • Delivery      │
│ • Totals        │    │ • Registration  │    │ • Instructions  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Payment Method  │    │ Order Review    │
                       │                 │    │                 │
                       │ • Credit card   │    │ • Final check   │
                       │ • PayPal        │    │ • Terms agree   │
                       │ • Crypto        │    │ • Place order   │
                       └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Payment Process │    │ Order Success   │
                       │                 │    │                 │
                       │ • Validate      │    │ • Confirmation  │
                       │ • Charge        │    │ • Email receipt │
                       │ • Confirm       │    │ • Order number  │
                       └─────────────────┘    └─────────────────┘
```

### **NFT Certificate Flow**

```
Product Purchase
     │
     ▼
┌─────────────────┐
│ NFT Option      │
│                 │
│ • Enable NFT?   │
│ • Extra cost    │
│ • Benefits      │
└─────────────────┘
     │
     ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Wallet Connect  │───▶│ Mint NFT        │───▶│ Certificate     │
│                 │    │                 │    │                 │
│ • MetaMask      │    │ • Blockchain    │    │ • View cert     │
│ • Web3 auth     │    │ • Transaction   │    │ • Download      │
│ • Network       │    │ • Confirmation  │    │ • Share link    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📱 Mobile User Experience Flow

### **Mobile Navigation Pattern**

```
Mobile Homepage
     │
     ▼
┌─────────────────┐
│ Header          │
│ ☰ 🍯BeeSure 🛒👤│
└─────────────────┘
     │
     ▼ (tap hamburger)
┌─────────────────┐
│ Slide Menu      │
│                 │
│ • Home          │
│ • Marketplace   │
│ • Trace Honey   │
│ • About         │
│ • Contact       │
│ • Login         │
└─────────────────┘
```

### **Mobile Shopping Flow**

```
Product Grid (2 cols)
     │
     ▼ (tap product)
┌─────────────────┐
│ Product Detail  │
│                 │
│ • Image carousel│
│ • Stacked info  │
│ • Sticky CTA    │
└─────────────────┘
     │
     ▼ (add to cart)
┌─────────────────┐
│ Cart Drawer     │
│                 │
│ • Slide up      │
│ • Quick view    │
│ • Checkout CTA  │
└─────────────────┘
```

This comprehensive flow documentation provides clear pathways for users and administrators, ensuring intuitive navigation and efficient task completion throughout the BeeSure platform.
