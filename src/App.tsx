import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UserRound,
  X,
} from 'lucide-react';

type ArtStyle = 'Warli' | 'Madhubani' | 'Gond' | 'Pattachitra' | 'Kalamkari' | 'Signature' | 'Surya' | 'Floral' | 'Shiva' | 'Forest' | 'Monsoon';
type Product = {
  id: string;
  name: string;
  style: ArtStyle;
  price: number;
  rating: number;
  description: string;
  image: string;
  lifestyleImage: string;
  accent: string;
  sizes: number[];
};
type Review = { id: string; name: string; rating: number; text: string; createdAt: string; };
type CartItem = Product & { size: number; quantity: number };
type SavedAddress = { id: string; fullName: string; phone: string; building: string; street: string; city: string; state: string; pin: string; isDefault: boolean };
type UserAccount = { id: string; name: string; email: string; password: string; addresses: SavedAddress[] };

const initialProductReviews: Record<string, Review[]> = {
  dhara: [
    { id: 'dhara-1', name: 'Rhea', rating: 5, text: 'The feel is unbelievably easy and the print feels so premium.', createdAt: '2026-01-06T10:00:00.000Z' },
    { id: 'dhara-2', name: 'Aman', rating: 4, text: 'Comfortable from the first walk and the Warli details feel special.', createdAt: '2026-02-12T10:00:00.000Z' },
  ],
  rang: [
    { id: 'rang-1', name: 'Nia', rating: 5, text: 'Bright, warm and beautifully detailed. Feels like art on your feet.', createdAt: '2026-01-15T10:00:00.000Z' },
  ],
  van: [
    { id: 'van-1', name: 'Kabir', rating: 4, text: 'The sneakers feel sturdy and the design is understated in the best way.', createdAt: '2026-02-24T10:00:00.000Z' },
  ],
  chitra: [
    { id: 'chitra-1', name: 'Meher', rating: 5, text: 'The ornament details really stand out without feeling too loud.', createdAt: '2026-03-04T10:00:00.000Z' },
  ],
  rooh: [
    { id: 'rooh-1', name: 'Vikram', rating: 4, text: 'The colours are richer in person and the sole feels comfortable all day.', createdAt: '2026-03-19T10:00:00.000Z' },
  ],
  signature: [
    { id: 'signature-1', name: 'Sana', rating: 5, text: 'This is the pair I keep reaching for. Clean and timeless.', createdAt: '2026-04-05T10:00:00.000Z' },
  ],
};

const products: Product[] = [
  {
    id: 'dhara', name: 'KADAM DHARA', style: 'Warli', price: 2999, rating: 4.8,
    description: 'A quiet celebration of movement, community and the earth beneath us.',
    image: '/images/products/kadam_product_dhara.png', lifestyleImage: '/images/lifestyle/kadam_lifestyle_dhara.png', accent: '#7a4932', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'rang', name: 'KADAM RANG', style: 'Madhubani', price: 3199, rating: 4.9,
    description: 'Fine lines and living colour, redrawn for the everyday.',
    image: '/images/products/kadam_product_rang.png', lifestyleImage: '/images/lifestyle/kadam_lifestyle_rang.png', accent: '#a5483c', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'van', name: 'KADAM VAN', style: 'Gond', price: 2899, rating: 4.7,
    description: 'Wild forms, hidden forests and a little more room to wander.',
    image: '/images/products/kadam_product_van.png', lifestyleImage: '/images/lifestyle/kadam_lifestyle_van.png', accent: '#536249', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'chitra', name: 'KADAM CHITRA', style: 'Pattachitra', price: 3499, rating: 4.9,
    description: 'Ornamental linework with a bold point of view.',
    image: '/images/products/kadam_product_chitra.png', lifestyleImage: '/images/lifestyle/kadam_lifestyle_chitra.png', accent: '#943f35', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'rooh', name: 'KADAM ROOH', style: 'Kalamkari', price: 3299, rating: 4.8,
    description: 'Botanical stories, softened by hand and made for long days.',
    image: '/images/products/kadam_product_rooh.png', lifestyleImage: '/images/lifestyle/kadam_lifestyle_rooh.png', accent: '#3e5a4b', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'signature', name: 'KADAM SIGNATURE', style: 'Signature', price: 3999, rating: 5,
    description: 'The essential KADAM silhouette. Quietly unmistakable.',
    image: '/images/products/06_Folk_Ornamental.png', lifestyleImage: '/images/products/06_Folk_Ornamental.png', accent: '#5b2528', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'surya', name: 'KADAM SURYA', style: 'Surya', price: 3599, rating: 4.8,
    description: 'Sunlit geometry and an easy stride built for slow city mornings.',
    image: '/images/products/01_Surya_Clouds.png', lifestyleImage: '/images/products/01_Surya_Clouds.png', accent: '#d6a14a', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'floral', name: 'KADAM FLORAL', style: 'Floral', price: 3399, rating: 4.7,
    description: 'Botanical rhythms and softened colourwork for everyday movement.',
    image: '/images/products/02_Floral_Vines.png', lifestyleImage: '/images/products/02_Floral_Vines.png', accent: '#b06f5b', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'shiva', name: 'KADAM SHIVA', style: 'Shiva', price: 3899, rating: 4.9,
    description: 'Strong lines, ceremonial energy and a quietly powerful finish.',
    image: '/images/products/03_Shiva.png', lifestyleImage: '/images/products/03_Shiva.png', accent: '#6d5b4f', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'forest', name: 'KADAM FOREST', style: 'Forest', price: 3499, rating: 4.8,
    description: 'Wild textures and earthy tones inspired by nature and motion.',
    image: '/images/products/04_Forest_Wildlife.png', lifestyleImage: '/images/products/04_Forest_Wildlife.png', accent: '#3d5b3f', sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 'monsoon', name: 'KADAM MONSOON', style: 'Monsoon', price: 3799, rating: 4.8,
    description: 'Rain-soaked colour and a grounded silhouette for urban journeys.',
    image: '/images/products/05_Monsoon_Village.png', lifestyleImage: '/images/products/05_Monsoon_Village.png', accent: '#4d6d7f', sizes: [6, 7, 8, 9, 10],
  },
];

type ArtStory = { id: string; name: string; art: string; origin: string; story: string; image: string; productId: string };
const artStories: ArtStory[] = [
  { id: 'rang', name: 'KADAM RANG', art: 'Madhubani', origin: 'Bihar', story: 'Born from the visual traditions of Bihar, Madhubani art transforms everyday stories, nature and mythology into intricate compositions of colour and pattern. KADAM RANG brings that expressive language into a contemporary sneaker design.', image: '/images/art/madhubani.jpg', productId: 'rang' },
  { id: 'rooh', name: 'KADAM ROOH', art: 'Kalamkari', origin: 'Andhra Pradesh & Telangana', story: "Rooted in India's textile traditions, Kalamkari is known for expressive hand-drawn lines, botanical forms and intricate storytelling. KADAM ROOH translates this handcrafted character into a contemporary everyday silhouette.", image: '/images/art/kalamkari.jpg', productId: 'rooh' },
  { id: 'chitra', name: 'KADAM CHITRA', art: 'Pattachitra', origin: 'Odisha', story: "From Odisha's rich storytelling tradition comes Pattachitra, where mythology, symbolism and intricate linework come together within carefully composed borders. KADAM CHITRA carries that visual storytelling into a modern form.", image: '/images/art/pattachitra.jpg', productId: 'chitra' },
  { id: 'van', name: 'KADAM VAN', art: 'Gond', origin: 'Central India', story: 'Deeply connected with nature, Gond art brings animals, trees, birds and patterns together through rhythmic lines and repeated details. KADAM VAN reinterprets this relationship with nature through a contemporary sneaker.', image: '/images/art/gond.jpg', productId: 'van' },
  { id: 'dhara', name: 'KADAM DHARA', art: 'Warli', origin: 'Maharashtra', story: 'Warli art captures everyday life through simple geometric forms, human figures and a deep connection with nature. KADAM DHARA transforms this minimal visual language into a contemporary sneaker inspired by movement, community and the land.', image: '/images/art/warli.jpg', productId: 'dhara' },
];

const featuredArtImage = artStories.find((story) => story.productId === 'dhara')!.image;

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const readAccounts = (): UserAccount[] => {
  try {
    return JSON.parse(localStorage.getItem('kadam-accounts') || '[]') as UserAccount[];
  } catch {
    return [];
  }
};

function App() {
  const [page, setPage] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('kadam-theme') === 'dark');
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('kadam-cart') || '[]'));
  const [wishlist, setWishlist] = useState<string[]>(() => JSON.parse(localStorage.getItem('kadam-wishlist') || '[]'));
  const [accounts, setAccounts] = useState<UserAccount[]>(readAccounts);
  const [activeUserId, setActiveUserId] = useState(() => localStorage.getItem('kadam-current-user') || '');
  const [productReviews, setProductReviews] = useState<Record<string, Review[]>>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('kadam-product-reviews') || '{}');
      return { ...initialProductReviews, ...stored };
    } catch {
      return { ...initialProductReviews };
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState('');
  const selectedProduct = products.find((product) => product.id === page.slice('product/'.length)) ?? products[0];
  const [query, setQuery] = useState('');

  useEffect(() => { localStorage.setItem('kadam-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { localStorage.setItem('kadam-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('kadam-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('kadam-product-reviews', JSON.stringify(productReviews)); }, [productReviews]);
  useEffect(() => { localStorage.setItem('kadam-accounts', JSON.stringify(accounts)); }, [accounts]);
  useEffect(() => { if (activeUserId) localStorage.setItem('kadam-current-user', activeUserId); else localStorage.removeItem('kadam-current-user'); }, [activeUserId]);
  useEffect(() => { if (toast) { const timer = window.setTimeout(() => setToast(''), 2400); return () => window.clearTimeout(timer); } }, [toast]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const activeUser = accounts.find((account) => account.id === activeUserId) ?? null;
  const searchResults = useMemo(() => products.filter((product) => `${product.name} ${product.style}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const navigate = (destination: string) => { setPage(destination); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleWishlist = (id: string) => { setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); setToast(wishlist.includes(id) ? 'Removed from wishlist' : 'Added to wishlist'); };
  const addToCart = (product: Product, size = 8) => { setCart((current) => { const match = current.find((item) => item.id === product.id && item.size === size); return match ? current.map((item) => item === match ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, size, quantity: 1 }]; }); setToast(`${product.name} added to cart`); setDrawerOpen(true); };
  const changeQuantity = (id: string, size: number, change: number) => setCart((current) => current.map((item) => item.id === id && item.size === size ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  const removeFromCart = (id: string, size: number) => setCart((current) => current.filter((item) => !(item.id === id && item.size === size)));
  const submitReview = (productId: string, name: string, rating: number, text: string) => { setProductReviews((current) => ({ ...current, [productId]: [...(current[productId] ?? []), { id: `${productId}-${Date.now()}`, name, rating, text, createdAt: new Date().toISOString() }] })); setToast('Review submitted'); };
  const clearCart = () => setCart([]);
  const saveAddress = (address: Omit<SavedAddress, 'id'> & { id?: string }) => {
    if (!activeUser) return;
    setAccounts((current) => current.map((account) => {
      if (account.id !== activeUser.id) return account;
      const id = address.id || `address-${Date.now()}`;
      const wasDefault = account.addresses.some((item) => item.id === id && item.isDefault);
      const nextAddress: SavedAddress = { ...address, id, isDefault: address.isDefault || wasDefault || account.addresses.length === 0 };
      const addresses = account.addresses
        .filter((item) => item.id !== id)
        .map((item) => nextAddress.isDefault ? { ...item, isDefault: false } : item);
      const updatedAddresses = [...addresses, nextAddress];
      if (!updatedAddresses.some((item) => item.isDefault)) updatedAddresses[0] = { ...updatedAddresses[0], isDefault: true };
      return { ...account, addresses: updatedAddresses };
    }));
  };
  const updateAddressDefault = (addressId: string) => {
    if (!activeUser) return;
    setAccounts((current) => current.map((account) => account.id !== activeUser.id ? account : {
      ...account,
      addresses: account.addresses.map((address) => ({ ...address, isDefault: address.id === addressId })),
    }));
  };
  const deleteAddress = (addressId: string) => {
    if (!activeUser) return;
    setAccounts((current) => current.map((account) => {
      if (account.id !== activeUser.id) return account;
      const addresses = account.addresses.filter((address) => address.id !== addressId);
      if (addresses.length && !addresses.some((address) => address.isDefault)) addresses[0] = { ...addresses[0], isDefault: true };
      return { ...account, addresses };
    }));
  };

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <Announcement />
      <header className="navbar">
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <button className="wordmark" onClick={() => navigate('home')}>KADAM<span>▲</span></button>
        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>
          {['home', 'shop', 'art-stories', 'lookbook', 'our-story'].map((item) => <button key={item} className={page === item ? 'active' : ''} onClick={() => navigate(item)}>{item === 'home' ? 'Home' : item === 'art-stories' ? 'Art Stories' : item === 'our-story' ? 'Our Story' : item}</button>)}
          <button onClick={() => navigate('customize')}>Create your KADAM</button>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} /></button>
          <button className="icon-button account-nav" aria-label={activeUser ? `Account: ${activeUser.name}` : 'Account'} title={activeUser ? activeUser.name : 'Account'} onClick={() => navigate('account')}><UserRound size={18} />{activeUser && <span>{activeUser.name.split(' ')[0]}</span>}</button>
          <button className="icon-button" aria-label="Wishlist" onClick={() => navigate('wishlist')}><Heart size={18} fill={wishlist.length ? 'currentColor' : 'none'} /></button>
          <button className="bag-button" aria-label="Open cart" onClick={() => setDrawerOpen(true)}><ShoppingBag size={18} /><b>{cartCount}</b></button>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme"><span className={dark ? 'sun' : 'moon'} /></button>
        </div>
      </header>
      {searchOpen && <div className="search-bar"><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search KADAM..." /><button onClick={() => setSearchOpen(false)}><X size={18} /></button>{query && <div className="search-results">{searchResults.map((product) => <button key={product.id} onClick={() => { navigate(`product/${product.id}`); setSearchOpen(false); }}><img src={product.image} alt="" /><span className="search-result-copy"><strong>{product.name}</strong><small>{product.style}</small></span><ArrowRight size={14} /></button>)}{!searchResults.length && <p>No pieces found. Try another story.</p>}</div>}</div>}

      {page === 'home' && <Home navigate={navigate} products={products} toggleWishlist={toggleWishlist} wishlist={wishlist} addToCart={addToCart} dark={dark} />}
      {page === 'shop' && <Shop products={products} navigate={navigate} toggleWishlist={toggleWishlist} wishlist={wishlist} addToCart={addToCart} />}
      {page.startsWith('product/') && <><ProductPage product={selectedProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} navigate={navigate} /><ProductReviews key={selectedProduct.id} product={selectedProduct} reviews={productReviews[selectedProduct.id] ?? []} submitReview={submitReview} /></>}
      {page === 'art-stories' && <ArtStories navigate={navigate} />}
      {page === 'lookbook' && <Lookbook products={products} />}
      {page === 'our-story' && <OurStory navigate={navigate} />}
      {page === 'customize' && <Customizer addToCart={addToCart} />}
      {page === 'wishlist' && <Wishlist products={products.filter((product) => wishlist.includes(product.id))} navigate={navigate} toggleWishlist={toggleWishlist} addToCart={addToCart} />}
      {page === 'cart' && <CartPage cart={cart} subtotal={subtotal} changeQuantity={changeQuantity} removeFromCart={removeFromCart} navigate={navigate} />}
      {page === 'checkout' && <CheckoutWithClearCart subtotal={subtotal} cart={cart} navigate={navigate} onPlaceOrder={clearCart} user={activeUser} saveAddress={saveAddress} />}
      {page === 'returns' && <ReturnPolicy navigate={navigate} />}
      {page === 'account' && <Account navigate={navigate} user={activeUser} onLogin={(email, password) => { const match = accounts.find((account) => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password); if (!match) return 'Email or password is incorrect.'; setActiveUserId(match.id); return ''; }} onSignup={(name, email, password) => { if (accounts.some((account) => account.email.toLowerCase() === email.trim().toLowerCase())) return 'An account with this email already exists.'; const account = { id: `user-${Date.now()}`, name: name.trim(), email: email.trim(), password, addresses: [] }; setAccounts((current) => [...current, account]); setActiveUserId(account.id); return ''; }} onLogout={() => setActiveUserId('')} saveAddress={saveAddress} setDefaultAddress={updateAddressDefault} deleteAddress={deleteAddress} />}

      <Footer navigate={navigate} />
      {drawerOpen && <CartDrawer cart={cart} subtotal={subtotal} changeQuantity={changeQuantity} removeFromCart={removeFromCart} navigate={navigate} close={() => setDrawerOpen(false)} />}
      {toast && <div className="toast"><Check size={15} />{toast}</div>}
    </div>
  );
}

function Announcement() { return <div className="announcement">Free shipping across India on orders over ₹2,999 <span>·</span> Made for the journey</div>; }

function Home({ navigate, products: items, toggleWishlist, wishlist, addToCart, dark }: { navigate: (page: string) => void; products: Product[]; toggleWishlist: (id: string) => void; wishlist: string[]; addToCart: (product: Product) => void; dark: boolean }) {
  return <main>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">The first chapter / 2026</p><h1>India,<br /><em>reimagined.</em></h1><p className="hero-text">Where timeless Indian artistry meets contemporary streetwear. Stories rooted in culture, made to move with you.</p><div className="hero-actions"><button className="button primary" onClick={() => navigate('shop')}>Shop the drop <ArrowRight size={16} /></button><button className="text-button" onClick={() => navigate('our-story')}>Discover KADAM <ArrowRight size={15} /></button></div><div className="hero-note"><span>01</span><div><strong>DHARA</strong><small>Inspired by Warli / The earth remembers</small></div></div></div>
      <div className="hero-visual"><div className="hero-orbit" /><div className="hero-art-label">रचना / 01</div><img className="hero-lifestyle" src={items[0].lifestyleImage} alt="KADAM DHARA styled for everyday wear" /></div>
    </section>
    <section className="marquee"><div>INDIA, REIMAGINED. <span>✦</span> INDIA, REIMAGINED. <span>✦</span> INDIA, REIMAGINED. <span>✦</span></div></section>
    <section className="section collection"><div className="section-heading"><div><p className="eyebrow">The collection / 01</p><h2>Signature<br /><em>collection.</em></h2></div><div className="heading-side"><p>Five artistic traditions.<br />One contemporary silhouette.</p><button className="text-button" onClick={() => navigate('shop')}>View all pieces <ArrowRight size={15} /></button></div></div><div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} toggleWishlist={toggleWishlist} wishlisted={wishlist.includes(product.id)} addToCart={addToCart} onOpen={() => { navigate(`product/${product.id}`); }} />)}</div></section>
    <ArtToSneaker navigate={navigate} />
    <ArtPreview navigate={navigate} />
    <section className="custom-tease"><div className="custom-copy"><p className="eyebrow">Make it yours / 02</p><h2>Create your<br /><em>KADAM.</em></h2><p>Choose your palette. Find your rhythm. Build a pair that only belongs to you.</p><button className="button light" onClick={() => navigate('customize')}>Start creating <ArrowRight size={16} /></button></div><div className="custom-swatch"><div className="custom-shoe"><div className="shoe-top" /><div className="shoe-sole" /></div><span>YOUR KADAM / 01</span></div></section>
    <section className="lookbook-tease"><div className="lookbook-image"><img src={items[5].lifestyleImage} alt="KADAM SIGNATURE styled for the KADAM lookbook" /></div><div className="lookbook-copy"><p className="eyebrow">The KADAM edit / 03</p><h2>Step into<br /><em>the story.</em></h2><p>Traditional art, contemporary steps. A visual study of the people, places and stories that give KADAM its rhythm.</p><button className="text-button" onClick={() => navigate('lookbook')}>Explore the lookbook <ArrowRight size={15} /></button></div></section>
    <section className="story-strip"><div><p className="eyebrow">Our point of view / 04</p><h2>Art.<br />Culture.<br /><em>Design.</em></h2></div><div className="story-image"><img src={featuredArtImage} alt="Warli folk art inspiring KADAM DHARA" /><span>Every step carries a story.</span></div><div className="story-copy"><p>Indian art has always told stories. KADAM gives those stories a new way to walk.</p><button className="text-button" onClick={() => navigate('our-story')}>Read our story <ArrowRight size={15} /></button></div></section>
    <section className="final-cta"><p className="eyebrow">Your next step / 05</p><h2>India,<br /><em>reimagined.</em></h2><button className="button light" onClick={() => navigate('shop')}>Shop KADAM <ArrowRight size={16} /></button></section>
  </main>;
}

function ProductCard({ product, toggleWishlist, wishlisted, addToCart, onOpen }: { product: Product; toggleWishlist: (id: string) => void; wishlisted: boolean; addToCart: (product: Product) => void; onOpen: () => void }) { return <article className="product-card"><div className="product-image" onClick={onOpen}><img className={`collection-image ${product.id}`} src={product.image} alt={`${product.name}, inspired by ${product.style} art`} loading="lazy" /><button className="heart-card" aria-label="Save product" onClick={(event) => { event.stopPropagation(); toggleWishlist(product.id); }}><Heart size={17} fill={wishlisted ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={(event) => { event.stopPropagation(); addToCart(product); }}>Quick add <Plus size={14} /></button><span className="product-index">0{products.findIndex((item) => item.id === product.id) + 1}</span></div><div className="product-info" onClick={onOpen}><div><h3>{product.name}</h3><p>Inspired by {product.style} art</p></div><strong>{money(product.price)}</strong></div><div className="product-meta"><span><Star size={12} fill="currentColor" /> {product.rating}</span><span>6 · 7 · 8 · 9 · 10</span></div></article>; }

function ArtToSneaker({ navigate }: { navigate: (page: string) => void }) { return <section className="art-sneaker"><div className="art-sneaker-image"><img src={featuredArtImage} alt="Warli art inspiring KADAM DHARA" /><span>From the archive / 01</span></div><div className="art-sneaker-copy"><p className="eyebrow">Art to sneaker / 02</p><h2>Old stories.<br /><em>New steps.</em></h2><p>We look to the lines, movement and memory within India's visual languages — then translate them into something you can live in.</p><div className="process"><div><span>01</span><strong>Tradition</strong></div><ArrowRight size={16} /><div><span>02</span><strong>Motifs</strong></div><ArrowRight size={16} /><div><span>03</span><strong>Motion</strong></div></div><button className="text-button" onClick={() => navigate('art-stories')}>Explore the art stories <ArrowRight size={15} /></button></div></section>; }

function ArtPreview({ navigate }: { navigate: (page: string) => void }) { return <section className="section art-preview"><div className="section-heading"><div><p className="eyebrow">The inspiration / 02</p><h2>Art → Culture →<br /><em>Design.</em></h2></div><div className="heading-side"><p>Every KADAM begins with a story.</p><button className="text-button" onClick={() => navigate('art-stories')}>Explore art stories <ArrowRight size={15} /></button></div></div><div className="art-preview-grid">{artStories.map((story, index) => <button className="art-preview-card" key={story.id} onClick={() => navigate('art-stories')}><span className="art-preview-index">0{index + 1}</span><div className="art-preview-image"><img src={story.image} alt={`${story.art} artwork inspiring ${story.name}`} loading="lazy" /></div><div className="art-preview-info"><strong>{story.name}</strong><span>{story.art}</span></div></button>)}</div></section>; }

function Shop({ products: items, navigate, toggleWishlist, wishlist, addToCart }: { products: Product[]; navigate: (page: string) => void; toggleWishlist: (id: string) => void; wishlist: string[]; addToCart: (product: Product) => void }) { const [filter, setFilter] = useState<ArtStyle | 'All'>('All'); const [sort, setSort] = useState('Featured'); const filtered = items.filter((product) => filter === 'All' || product.style === filter).sort((a, b) => sort === 'Price low to high' ? a.price - b.price : sort === 'Price high to low' ? b.price - a.price : 0); return <main className="page-shell"><div className="page-hero"><p className="eyebrow">The complete edit</p><h1>Shop <em>KADAM.</em></h1><p>Contemporary sneakers inspired by India's artistic traditions.</p></div><div className="shop-toolbar"><div className="filter-pills">{(['All', 'Warli', 'Madhubani', 'Gond', 'Pattachitra', 'Kalamkari', 'Signature'] as const).map((item) => <button className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="sort-select">{filtered.length} pieces <ChevronDown size={14} /><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price low to high</option><option>Price high to low</option></select></label></div><div className="product-grid shop-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} toggleWishlist={toggleWishlist} wishlisted={wishlist.includes(product.id)} addToCart={addToCart} onOpen={() => { navigate(`product/${product.id}`); }} />)}</div></main>; }

function ProductPage({ product, addToCart, toggleWishlist, wishlist, navigate }: { product: Product; addToCart: (product: Product, size?: number) => void; toggleWishlist: (id: string) => void; wishlist: string[]; navigate: (page: string) => void }) {
  const [size, setSize] = useState(8);
  const [tab, setTab] = useState('Product story');
  const productArt = artStories.find((story) => story.productId === product.id);
  const galleryImages = [product.image, product.lifestyleImage, productArt?.image ?? product.lifestyleImage, product.image];

  return <main className="product-page page-shell"><button className="back-button" onClick={() => navigate('shop')}><ChevronLeft size={16} /> Back to shop</button><div className="product-detail"><div className="product-gallery"><div className="gallery-main"><img className={`collection-image ${product.id}`} src={product.image} alt={`${product.name} product view`} /><span>01 / 04</span></div><div className="gallery-thumbs">{galleryImages.map((image, index) => <button key={index}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div></div><div className="product-detail-copy"><p className="eyebrow">{product.style} / Limited edition</p><h1>{product.name}</h1><p className="detail-subtitle">Inspired by {product.style} art</p><div className="rating-line"><span><Star size={14} fill="currentColor" /> {product.rating}</span><span className="muted">12 sample reviews</span></div><div className="detail-price">{money(product.price)}</div><p className="detail-description">{product.description} Every pair is designed in India, finished by hand and made for wherever the day takes you.</p><div className="size-label"><strong>Select size</strong><button>Size guide <ArrowRight size={13} /></button></div><div className="sizes">{product.sizes.map((item) => <button className={size === item ? 'selected' : ''} key={item} onClick={() => setSize(item)}>{item}</button>)}</div><div className="detail-actions"><button className="button primary" onClick={() => addToCart(product, size)}>Add to cart <ShoppingBag size={16} /></button><button className="outline-button" aria-label="Add to wishlist" onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button></div><div className="detail-note"><Check size={16} /><span>Free shipping on orders over ₹2,999<br /><small>Easy 7-day exchanges on unworn pairs.</small></span></div></div></div><div className="product-tabs">{['Product story', 'Art inspiration', 'Materials & details', 'Reviews'].map((item) => <button className={tab === item ? 'selected' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}<div className="tab-content"><p>{tab === 'Product story' && 'Dhara is a study in movement. Its hand-drawn figures trace the joy of coming together, bringing the warmth of a Warli village to a silhouette built for the city.'}{tab === 'Art inspiration' && 'Warli art comes from Maharashtra, where simple geometric forms create vivid stories of everyday life, harvests and celebration. We kept the linework honest and the palette close to earth.'}{tab === 'Materials & details' && 'Textured vegan leather upper, cushioned footbed, rubber outsole and cotton laces. Wipe clean with a soft cloth; store away from direct sunlight.'}{tab === 'Reviews' && '“Beautifully made and surprisingly comfortable from day one.” — Sample customer review\n\nDemo reviews are shown for this concept store and do not represent verified purchases.'}</p></div></div></main>;
}

function ArtStories({ navigate }: { navigate: (page: string) => void }) { return <main className="editorial-page page-shell"><div className="page-hero dark-hero"><p className="eyebrow">The visual language</p><h1>Art<br /><em>stories.</em></h1><p>Where India's stories meet contemporary design.<br />Five artistic traditions. Five perspectives. One new way forward.</p></div>{artStories.map((story, index) => { const product = products.find((p) => p.id === story.productId)!; const imageLeft = index % 2 === 0; return <section className={`art-spread ${imageLeft ? 'image-left' : 'image-right'}`} key={story.id}><div className="art-spread-number">0{index + 1} / 05</div>{imageLeft && <ArtSpreadImage story={story} />}<div className="art-spread-copy"><p className="eyebrow">{story.art} / {story.origin}</p><h2>{story.name}</h2><p className="art-spread-story">{story.story}</p><div className="art-spread-connector"><span>Traditional art</span><ArrowRight size={14} /><span>Design language</span><ArrowRight size={14} /><span>KADAM sneaker</span></div><div className="art-spread-sneaker" onClick={() => navigate(`product/${product.id}`)}><img className={`collection-image ${product.id}`} src={product.image} alt={`${product.name} sneaker inspired by ${story.art}`} loading="lazy" /><div><strong>{product.name}</strong><span>Inspired by {story.art}</span></div></div><button className="button primary" onClick={() => navigate(`product/${product.id}`)}>Explore {story.name} <ArrowRight size={15} /></button></div>{!imageLeft && <ArtSpreadImage story={story} />}</section>; })}<div className="art-stories-cta"><button className="button light" onClick={() => navigate('shop')}>Explore the collection <ArrowRight size={16} /></button></div></main>; }

function ArtSpreadImage({ story }: { story: ArtStory }) { return <div className="art-spread-image"><img src={story.image} alt={`${story.art} traditional artwork from ${story.origin}`} loading="lazy" /><span className="art-spread-label">{story.art} / {story.origin}</span></div>; }

function Lookbook({ products: items }: { products: Product[] }) {
  const signature = items.find((product) => product.id === 'signature') ?? items[0];
  return <main className="lookbook-page"><div className="lookbook-hero"><img src={signature.lifestyleImage} alt="KADAM SIGNATURE styled for the KADAM lookbook" /><div><p className="eyebrow">The KADAM lookbook</p><h1>Step into<br /><em>the story.</em></h1></div></div><div className="lookbook-intro"><p>Traditional art, contemporary steps. Meet the six KADAM stories through the people and places that bring them to life.</p><span>01 — 06</span></div><div className="lookbook-mosaic">{items.map((product) => <img key={product.id} className="lifestyle-crop" src={product.lifestyleImage} alt={`${product.name} lifestyle story`} loading="lazy" />)}<div className="mosaic-quote">“The best stories<br /><em>are lived in.</em>”</div><div className="lookbook-chapters"><span>01 / 06</span><strong>KADAM DHARA — Warli</strong><span>02 / 06</span><strong>KADAM RANG — Madhubani</strong><span>03 / 06</span><strong>KADAM VAN — Gond</strong><span>04 / 06</span><strong>KADAM CHITRA — Pattachitra</strong><span>05 / 06</span><strong>KADAM ROOH — Kalamkari</strong><span>06 / 06</span><strong>KADAM SIGNATURE</strong></div></div></main>;
}

function OurStory({ navigate }: { navigate: (page: string) => void }) { return <main className="our-story page-shell"><div className="page-hero"><p className="eyebrow">The house of KADAM</p><h1>Our <em>story.</em></h1><p>Indian art has always told stories. KADAM gives those stories a new way to walk.</p></div><div className="story-timeline">{['Indian art', 'Culture', 'Inspiration', 'Design', 'KADAM'].map((item, index) => <div className={index === 4 ? 'timeline-item last' : 'timeline-item'} key={item}><span>0{index + 1}</span><div><h2>{item}</h2><p>{index === 0 ? 'A visual inheritance passed from one hand to another.' : index === 1 ? 'The details that make a place feel like home.' : index === 2 ? 'Looking closer at the lines, shapes and stories around us.' : index === 3 ? 'Translating memory into a silhouette for now.' : 'A sneaker with somewhere to go.'}</p></div></div>)}</div><section className="philosophy"><div><p className="eyebrow">A considered approach</p><h2>Not heritage<br /><em>preserved.</em><br />Heritage in motion.</h2></div><div><p>KADAM exists at the meeting point of two energies: the patience of traditional making and the restless rhythm of contemporary life.</p><p>We work with visual languages rooted in India, not to replicate them, but to let their spirit travel. On pavements, through train stations, into the everyday.</p><div className="principles"><span>Thoughtful packaging</span><span>Durable construction</span><span>Designed for long-term wear</span></div><button className="button primary" onClick={() => navigate('shop')}>Find your pair <ArrowRight size={16} /></button></div></section><section className="story-visual-panel"><div className="story-feature-image"><img src="/images/art/warli.jpg" alt="Indian art visual story" /></div><div className="story-feature-copy"><p className="eyebrow">Our story</p><h3>Indian art, shaped for the street.</h3><p>We begin with patterns, symbols and memory. From there, we turn visual language into a form that moves with contemporary life.</p></div></section><section className="story-visual-grid"><div className="story-visual-card large"><img src="/images/art/gond.jpg" alt="Gond-inspired art" /><div><span>Indian art</span><strong>Pattern. Memory. Motion.</strong></div></div><div className="story-visual-card"><img src="/images/art/kalamkari.jpg" alt="Kalamkari-inspired art" /><div><span>Art</span><strong>Hand-drawn rhythm</strong></div></div></section><section className="story-steps"><div className="story-step"><span>01</span><p>Art / motif</p></div><div className="story-step"><span>02</span><p>Interpretation</p></div><div className="story-step"><span>03</span><p>KADAM sneaker</p></div></section><section className="story-collection"><div className="section-heading compact"><div><p className="eyebrow">The collection</p><h2>Selected<br /><em>stories.</em></h2></div></div><div className="story-collection-grid">{products.filter((product) => ['surya', 'floral', 'shiva', 'forest', 'monsoon'].includes(product.id)).map((product) => <button key={product.id} className="story-product-card" onClick={() => navigate(`product/${product.id}`)}><img src={product.image} alt={product.name} /><div><strong>{product.name}</strong><span>{product.style} / India</span></div></button>)}</div></section></main>; }

function ReturnPolicy({ navigate }: { navigate: (page: string) => void }) {
  return <main className="page-shell return-policy-page"><div className="page-hero compact"><p className="eyebrow">Support</p><h1>Return <em>policy.</em></h1></div><div className="return-policy"><p>Returns are accepted within 7 days of delivery. To be eligible, products must be unused and unworn, in original condition, and returned in their original packaging with all tags and accessories included.</p><section className="return-policy-item"><h2>Request a return</h2><p>Contact KADAM support to request a return and share your order details. Items that are damaged, worn, or altered after delivery may not be eligible.</p></section><section className="return-policy-item"><h2>Inspection and refunds</h2><p>Once the returned product is received and inspected, the return will be processed. Refunds, where applicable, will be issued to the original payment method.</p></section><section className="return-policy-item"><h2>Size exchanges</h2><p>For size issues, contact KADAM support to request an exchange, subject to availability.</p></section><button className="button primary" onClick={() => navigate('shop')}>Continue shopping <ArrowRight size={16} /></button></div></main>;
}

function Customizer({ addToCart }: { addToCart: (product: Product) => void }) { const [colour, setColour] = useState('Cream'); const [style, setStyle] = useState('Warli'); const [laces, setLaces] = useState('Maroon'); const [sole, setSole] = useState('Brown'); const choices = [['Sneaker colour', ['Cream', 'Black', 'Tan'], colour, setColour], ['Art style', ['Warli', 'Madhubani', 'Gond', 'Kalamkari'], style, setStyle], ['Laces', ['Cream', 'Maroon', 'Brown'], laces, setLaces], ['Sole', ['Cream', 'Brown', 'Black'], sole, setSole]] as const; return <main className="customizer page-shell"><div className="page-hero"><p className="eyebrow">The personal edition</p><h1>Create your<br /><em>KADAM.</em></h1><p>Make the story yours.</p></div><div className="custom-layout"><div className="custom-preview"><div className={`custom-shoe large ${colour.toLowerCase()} ${sole.toLowerCase()}`}><div className="shoe-top" /><div className="shoe-sole" /><span>{style}</span></div><div className="preview-caption"><span>YOUR KADAM</span><strong>01 / 01</strong></div></div><div className="custom-controls">{choices.map(([label, options, value, setter]) => <div className="choice-group" key={label}><div className="choice-heading"><strong>{label}</strong><span>{value}</span></div><div className="choice-options">{options.map((option) => <button className={value === option ? 'selected' : ''} key={option} onClick={() => setter(option)}>{option}{value === option && <Check size={14} />}</button>)}</div></div>)}<div className="custom-total"><span>YOUR KADAM</span><strong>{money(3499)}</strong></div><button className="button primary full" onClick={() => addToCart({ ...products[5], name: `KADAM CUSTOM / ${style.toUpperCase()}` })}>Add to cart <ShoppingBag size={16} /></button><button className="reset-button" onClick={() => { setColour('Cream'); setStyle('Warli'); setLaces('Maroon'); setSole('Brown'); }}>Reset configuration</button></div></div></main>; }

function Wishlist({ products: items, navigate, toggleWishlist, addToCart }: { products: Product[]; navigate: (page: string) => void; toggleWishlist: (id: string) => void; addToCart: (product: Product) => void }) { return <main className="page-shell"><div className="page-hero"><p className="eyebrow">Saved for later</p><h1>My <em>wishlist.</em></h1><p>{items.length ? 'The pieces you keep coming back to.' : 'Your next favourite pair belongs here.'}</p></div>{items.length ? <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} toggleWishlist={toggleWishlist} wishlisted addToCart={addToCart} onOpen={() => navigate(`product/${product.id}`)} />)}</div> : <div className="empty-state"><Heart size={30} /><p>Your wishlist is waiting for a story.</p><button className="button primary" onClick={() => navigate('shop')}>Explore the collection</button></div>}</main>; }

function CartDrawer({ cart, subtotal, changeQuantity, removeFromCart, navigate, close }: { cart: CartItem[]; subtotal: number; changeQuantity: (id: string, size: number, change: number) => void; removeFromCart: (id: string, size: number) => void; navigate: (page: string) => void; close: () => void }) { return <div className="drawer-backdrop" onClick={close}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><h2>Your cart <span>({cart.length})</span></h2><button className="icon-button" onClick={close}><X size={18} /></button></div>{cart.length ? <><div className="drawer-items">{cart.map((item) => <CartLine key={`${item.id}-${item.size}`} item={item} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />)}</div><div className="drawer-bottom"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping calculated at checkout.</p><button className="button primary full" onClick={() => { close(); navigate('checkout'); }}>Checkout <ArrowRight size={16} /></button><button className="text-button center" onClick={() => { close(); navigate('cart'); }}>View full cart</button></div></> : <div className="empty-state"><ShoppingBag size={28} /><p>Your cart is ready for its first story.</p><button className="button primary" onClick={close}>Continue shopping</button></div>}</aside></div>; }

function CartLine({ item, changeQuantity, removeFromCart }: { item: CartItem; changeQuantity: (id: string, size: number, change: number) => void; removeFromCart: (id: string, size: number) => void }) { return <div className="cart-line"><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><small>Size {item.size}</small><div className="quantity"><button onClick={() => changeQuantity(item.id, item.size, -1)}><Minus size={12} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, item.size, 1)}><Plus size={12} /></button></div></div><div className="line-price"><strong>{money(item.price * item.quantity)}</strong><button onClick={() => removeFromCart(item.id, item.size)}>Remove</button></div></div>; }

function CartPage({ cart, subtotal, changeQuantity, removeFromCart, navigate }: { cart: CartItem[]; subtotal: number; changeQuantity: (id: string, size: number, change: number) => void; removeFromCart: (id: string, size: number) => void; navigate: (page: string) => void }) { return <main className="page-shell"><div className="page-hero compact"><p className="eyebrow">Almost yours</p><h1>Your <em>cart.</em></h1></div><div className="full-cart"><div>{cart.map((item) => <CartLine key={`${item.id}-${item.size}`} item={item} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />)}{!cart.length && <div className="empty-state"><ShoppingBag size={28} /><p>Your cart is empty.</p></div>}</div><div className="cart-summary"><h3>Summary</h3><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><strong>{subtotal >= 2999 ? 'Free' : money(149)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(subtotal + (subtotal >= 2999 || subtotal === 0 ? 0 : 149))}</strong></div><button className="button primary full" onClick={() => navigate('checkout')} disabled={!cart.length}>Checkout <ArrowRight size={16} /></button><button className="text-button center" onClick={() => navigate('shop')}>Continue shopping</button></div></div></main>; }

function Checkout({ subtotal, cart, navigate }: { subtotal: number; cart: CartItem[]; navigate: (page: string) => void }) { const [done, setDone] = useState(false); if (done) return <main className="confirmation page-shell"><div className="confirmation-mark"><Check size={34} /></div><p className="eyebrow">Order confirmed / #KD-26091</p><h1>Your KADAM<br /><em>is on its way.</em></h1><p>Thank you for giving the story somewhere new to go. We’ll keep you posted as your order travels to you.</p><button className="button primary" onClick={() => navigate('shop')}>Continue exploring <ArrowRight size={16} /></button></main>; return <main className="page-shell checkout"><div className="page-hero compact"><p className="eyebrow">A considered finish</p><h1>Check <em>out.</em></h1></div><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setDone(true); }}><CheckoutSection title="Contact"><div className="form-grid"><label>Full name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone<input required placeholder="+91 00000 00000" /></label></div></CheckoutSection><CheckoutSection title="Delivery"><div className="form-grid"><label>Address<input required placeholder="Flat, building, street" /></label><label>City<input required placeholder="Mumbai" /></label><label>State<input required placeholder="Maharashtra" /></label><label>Pincode<input required placeholder="400001" /></label></div></CheckoutSection><CheckoutSection title="Payment"><div className="payment-options"><label><input type="radio" name="payment" defaultChecked /> UPI <span>Recommended</span></label><label><input type="radio" name="payment" /> Card</label><label><input type="radio" name="payment" /> Cash on delivery</label></div></CheckoutSection><button className="button primary" type="submit">Place order <ArrowRight size={16} /></button></form><div className="checkout-summary"><h3>Order summary</h3>{cart.map((item) => <div className="summary-line" key={`${item.id}-${item.size}`}><span>{item.name}<small>Size {item.size} × {item.quantity}</small></span><strong>{money(item.price * item.quantity)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div></div></div></main>; }
function CheckoutSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="checkout-section"><h3>{title}</h3>{children}</section>; }
type AddressDraft = Omit<SavedAddress, 'id'>;

const emptyAddress = (fullName = ''): AddressDraft => ({ fullName, phone: '', building: '', street: '', city: '', state: '', pin: '', isDefault: false });

function AddressFields({ value, onChange }: { value: AddressDraft; onChange: (value: AddressDraft) => void }) {
  const update = (field: keyof AddressDraft, next: string | boolean) => onChange({ ...value, [field]: next });
  return <div className="form-grid address-form-grid">
    <label>Full name<input required autoComplete="name" value={value.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder="Your name" /></label>
    <label>Phone number<input required type="tel" autoComplete="tel" minLength={8} maxLength={18} value={value.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+91 00000 00000" /></label>
    <label>House / Flat / Building<input required autoComplete="address-line1" value={value.building} onChange={(event) => update('building', event.target.value)} placeholder="Flat, building or house" /></label>
    <label>Street / Area<input required autoComplete="address-line2" value={value.street} onChange={(event) => update('street', event.target.value)} placeholder="Street or area" /></label>
    <label>City<input required autoComplete="address-level2" value={value.city} onChange={(event) => update('city', event.target.value)} placeholder="Mumbai" /></label>
    <label>State<input required autoComplete="address-level1" value={value.state} onChange={(event) => update('state', event.target.value)} placeholder="Maharashtra" /></label>
    <label>PIN code<input required inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" maxLength={6} value={value.pin} onChange={(event) => update('pin', event.target.value)} placeholder="400001" /></label>
  </div>;
}

function AddressText({ address }: { address: SavedAddress }) {
  return <p className="address-text">{address.fullName}<br />{address.building}, {address.street}<br />{address.city}, {address.state} {address.pin}<br />{address.phone}</p>;
}

function Account({ navigate, user, onLogin, onSignup, onLogout, saveAddress, setDefaultAddress, deleteAddress }: {
  navigate: (page: string) => void;
  user: UserAccount | null;
  onLogin: (email: string, password: string) => string;
  onSignup: (name: string, email: string, password: string) => string;
  onLogout: () => void;
  saveAddress: (address: Omit<SavedAddress, 'id'> & { id?: string }) => void;
  setDefaultAddress: (addressId: string) => void;
  deleteAddress: (addressId: string) => void;
}) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [editingAddressId, setEditingAddressId] = useState('');
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [addressDraft, setAddressDraft] = useState<AddressDraft>(emptyAddress());

  const submitAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (mode === 'signup') {
      if (password.length < 8) { setError('Use a password with at least 8 characters.'); return; }
      if (password !== confirmPassword) { setError('Your passwords do not match.'); return; }
      const result = onSignup(name, email, password);
      if (result) setError(result);
      return;
    }
    const result = onLogin(email, password);
    if (result) setError(result);
  };

  const startAddress = (address?: SavedAddress) => {
    setEditingAddressId(address?.id ?? '');
    setAddressDraft(address ? { ...address } : emptyAddress(user?.name));
    setAddressFormOpen(true);
  };

  const submitAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAddress({ ...addressDraft, id: editingAddressId || undefined, isDefault: addressDraft.isDefault || !user?.addresses.length });
    setAddressFormOpen(false);
    setEditingAddressId('');
    setAddressDraft(emptyAddress(user?.name));
  };

  return <main className="page-shell account"><div className="page-hero"><p className="eyebrow">The KADAM club</p><h1>Your <em>account.</em></h1><p>{user ? 'Your details and saved delivery addresses.' : 'Sign in to keep your details and delivery addresses close.'}</p></div>
    {!user ? <section className="account-auth"><div className="account-auth-heading"><UserRound size={24} /><div><p className="eyebrow">Welcome to KADAM</p><h2>{mode === 'login' ? 'Sign in.' : 'Create an account.'}</h2></div></div>
      <div className="account-tabs" role="tablist"><button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError(''); }}>Login</button><button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'selected' : ''} onClick={() => { setMode('signup'); setError(''); }}>Sign Up</button></div>
      <form className="account-form" onSubmit={submitAuth}>
        {mode === 'signup' && <label>Full name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" /></label>}
        <label>Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
        <label>Password<input required type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>
        {mode === 'signup' && <label>Confirm password<input required type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter your password again" /></label>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary full" type="submit">{mode === 'login' ? 'Login' : 'Create Account'} <ArrowRight size={16} /></button>
      </form>
    </section> : <div className="account-content">
      <section className="account-panel profile-panel"><div><p className="eyebrow">Profile information</p><h2>{user.name}</h2><p>{user.email}</p></div><button className="outline-button account-logout" onClick={onLogout}>Logout</button></section>
      <section className="account-panel"><div className="account-section-heading"><div><p className="eyebrow">Your delivery details</p><h2>Saved addresses</h2></div><button className="text-button" onClick={() => startAddress()}>Add address <Plus size={15} /></button></div>
        {addressFormOpen && <form className="address-editor" onSubmit={submitAddress}><h3>{editingAddressId ? 'Edit address' : 'New address'}</h3><AddressFields value={addressDraft} onChange={setAddressDraft} /><label className="checkbox-line"><input type="checkbox" checked={addressDraft.isDefault} onChange={(event) => setAddressDraft({ ...addressDraft, isDefault: event.target.checked })} /> Make this my default address</label><div className="address-form-actions"><button className="button primary" type="submit">Save address <Check size={15} /></button><button className="text-button" type="button" onClick={() => setAddressFormOpen(false)}>Cancel</button></div></form>}
        {user.addresses.length ? <div className="address-list">{user.addresses.map((address) => <article className="saved-address" key={address.id}><div className="saved-address-heading"><strong>{address.fullName}</strong>{address.isDefault && <span className="default-label">Default address</span>}</div><AddressText address={address} /><div className="saved-address-actions"><button onClick={() => startAddress(address)}>Edit</button>{!address.isDefault && <button onClick={() => setDefaultAddress(address.id)}>Make default</button>}<button onClick={() => deleteAddress(address.id)}>Delete</button></div></article>)}</div> : !addressFormOpen && <p className="account-empty">No saved addresses yet. Add one for a quicker checkout next time.</p>}
      </section>
      <button className="text-button account-continue" onClick={() => navigate('shop')}>Continue shopping <ArrowRight size={15} /></button>
    </div>}
  </main>;
}

function Footer({ navigate }: { navigate: (page: string) => void }) { return <footer><div className="footer-top"><div><button className="wordmark footer-logo" onClick={() => navigate('home')}>KADAM<span>▲</span></button><p>India, reimagined.</p><div className="socials"><Instagram size={17} /><span>pinterest</span></div></div><div className="footer-news"><p className="eyebrow">Stay in the loop</p><h3>New drops, stories<br />and KADAM updates.</h3><div className="newsletter"><input placeholder="Enter your email" type="email" /><button>Join</button></div></div><div className="footer-links"><div><span>Shop</span><button onClick={() => navigate('shop')}>Signature collection</button><button onClick={() => navigate('shop')}>New arrivals</button><button onClick={() => navigate('shop')}>Best sellers</button></div><div><span>About</span><button onClick={() => navigate('our-story')}>Our story</button><button onClick={() => navigate('art-stories')}>Art stories</button><button onClick={() => navigate('lookbook')}>Lookbook</button></div><div><span>Support</span><button>Contact</button><button>Shipping</button><button onClick={() => navigate('returns')}>Return Policy</button></div></div></div><div className="footer-bottom"><span>© 2026 KADAM</span><span>Made with intention in India</span><span>Privacy / Terms</span></div></footer>; }

function ProductReviews({ product, reviews, submitReview }: { product: Product; reviews: Review[]; submitReview: (productId: string, name: string, rating: number, text: string) => void }) {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const average = reviews.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : product.rating;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) return;
    submitReview(product.id, trimmedName, rating, trimmedText);
    setName('');
    setRating(5);
    setText('');
    setFormOpen(false);
  };

  return <section className="reviews-panel page-shell"><div className="reviews-header"><div><p className="eyebrow">Customer Reviews</p><h2>What people are saying</h2></div><div className="reviews-summary"><div className="star-row" aria-label={`${average.toFixed(1)} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < Math.round(average) ? 'currentColor' : 'none'} />)}</div><strong>{average.toFixed(1)} / 5</strong><span>{reviews.length} review{reviews.length === 1 ? '' : 's'}</span></div></div><div className="reviews-layout"><div className="review-list">{reviews.length ? reviews.map((review) => <article className="review-item" key={review.id}><div className="review-top"><strong>{review.name}</strong><span>{new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div><div className="star-row" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={`${review.id}-${index}`} size={12} fill={index < review.rating ? 'currentColor' : 'none'} />)}</div><p>{review.text}</p></article>) : <p className="empty-review">No reviews yet. Be the first to share yours.</p>}</div><button className="button primary write-review-button" type="button" onClick={() => setFormOpen(true)}>Write a Review <ArrowRight size={15} /></button></div>{formOpen && <div className="review-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}><section className="review-modal" role="dialog" aria-modal="true" aria-labelledby="review-modal-title"><div className="review-modal-header"><div><p className="eyebrow">Share your experience</p><h2 id="review-modal-title">Write a Review</h2></div><button className="icon-button" type="button" aria-label="Close review form" onClick={() => setFormOpen(false)}><X size={18} /></button></div><form className="review-form" onSubmit={handleSubmit}><label>Name<input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></label><label>Rating<select value={rating} onChange={(event) => setRating(Number(event.target.value))}><option value={5}>5 stars</option><option value={4}>4 stars</option><option value={3}>3 stars</option><option value={2}>2 stars</option><option value={1}>1 star</option></select></label><label>Review<textarea value={text} onChange={(event) => setText(event.target.value)} rows={4} placeholder="Tell us what you think..." required /></label><button className="button primary" type="submit">Submit Review <ArrowRight size={15} /></button></form></section></div>}</section>;
}

function CheckoutWithClearCart({ subtotal, cart, navigate, onPlaceOrder, user, saveAddress }: { subtotal: number; cart: CartItem[]; navigate: (page: string) => void; onPlaceOrder: () => void; user: UserAccount | null; saveAddress: (address: Omit<SavedAddress, 'id'> & { id?: string }) => void }) {
  const [done, setDone] = useState(false);
  const addresses = user?.addresses ?? [];
  const [selectedAddressId, setSelectedAddressId] = useState(() => addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id ?? '');
  const [changingAddress, setChangingAddress] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);
  const [saveForLater, setSaveForLater] = useState(false);
  const [addressDraft, setAddressDraft] = useState<AddressDraft>(() => emptyAddress(user?.name));
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? addresses.find((address) => address.isDefault) ?? addresses[0] ?? null;

  if (done) return <main className="confirmation page-shell"><div className="confirmation-mark"><Check size={34} /></div><p className="eyebrow">Order confirmed / #KD-26091</p><h1>Your KADAM<br /><em>is on its way.</em></h1><p>Thank you for giving the story somewhere new to go. We’ll keep you posted as your order travels to you.</p><button className="button primary" onClick={() => navigate('shop')}>Continue exploring <ArrowRight size={16} /></button></main>;

  const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user && (addingAddress || !selectedAddress) && saveForLater) {
      saveAddress({ ...addressDraft, isDefault: !addresses.length });
    }
    onPlaceOrder();
    setDone(true);
  };

  return <main className="page-shell checkout"><div className="page-hero compact"><p className="eyebrow">A considered finish</p><h1>Check <em>out.</em></h1></div><form className="checkout-layout" onSubmit={placeOrder}><div className="checkout-form">
    <CheckoutSection title="Contact">{user ? <div className="checkout-contact"><strong>{user.name}</strong><span>{user.email}</span>{selectedAddress && !addingAddress && <span>{selectedAddress.phone}</span>}</div> : <div className="form-grid"><label>Full name<input required autoComplete="name" placeholder="Your name" /></label><label>Email<input required type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Phone<input required type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></label></div>}</CheckoutSection>
    <CheckoutSection title="Delivery">{selectedAddress && !addingAddress ? <div className="checkout-address"><div className="checkout-address-heading"><strong>{selectedAddress.fullName}</strong>{selectedAddress.isDefault && <span className="default-label">Default address</span>}</div><AddressText address={selectedAddress} /><div className="checkout-address-actions"><button className="text-button" type="button" onClick={() => setChangingAddress(!changingAddress)}>{changingAddress ? 'Close addresses' : 'Change address'}</button><button className="text-button" type="button" onClick={() => { setAddingAddress(true); setChangingAddress(false); setAddressDraft(emptyAddress(user?.name)); setSaveForLater(true); }}>Add new address <Plus size={14} /></button></div>
      {changingAddress && <div className="checkout-address-list">{addresses.map((address) => <label className="address-choice" key={address.id}><input type="radio" name="saved-address" checked={selectedAddress.id === address.id} onChange={() => { setSelectedAddressId(address.id); setChangingAddress(false); }} /><span><strong>{address.fullName}{address.isDefault ? ' · Default' : ''}</strong><small>{address.building}, {address.street}, {address.city}, {address.state} {address.pin}</small></span></label>)}</div>}</div> : <div className="checkout-new-address"><AddressFields value={addressDraft} onChange={setAddressDraft} />{user ? <label className="checkbox-line"><input type="checkbox" checked={saveForLater} onChange={(event) => setSaveForLater(event.target.checked)} /> Save this address for future orders</label> : <button className="text-button checkout-signin" type="button" onClick={() => navigate('account')}>Sign in to save addresses <ArrowRight size={14} /></button>}{selectedAddress && <button className="text-button" type="button" onClick={() => setAddingAddress(false)}>Back to saved address</button>}</div>}</CheckoutSection>
    <CheckoutSection title="Payment"><div className="payment-options"><label><input type="radio" name="payment" value="upi" defaultChecked /> UPI <span>Recommended</span></label><label><input type="radio" name="payment" value="card" /> Card</label><label><input type="radio" name="payment" value="cod" /> Cash on delivery</label></div></CheckoutSection><button className="button primary" type="submit" disabled={!cart.length}>Place order <ArrowRight size={16} /></button></div><div className="checkout-sum"><h3>Summary</h3>{cart.map((item) => <div className="summary-line" key={`${item.id}-${item.size}`}><div><strong>{item.name}</strong><small>Size {item.size} · Qty {item.quantity}</small></div><strong>{money(item.price * item.quantity)}</strong></div>)}<div className="summary-total"><span>Grand total</span><strong>{money(subtotal + (subtotal >= 2999 || subtotal === 0 ? 0 : 149))}</strong></div><button className="button primary full" type="submit" disabled={!cart.length}>Place order <ArrowRight size={16} /></button></div></form></main>;
}

export default App;
