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

type ArtStyle = 'Warli' | 'Madhubani' | 'Gond' | 'Pattachitra' | 'Kalamkari' | 'Signature';
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
type CartItem = Product & { size: number; quantity: number };

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
    image: '/images/products/kadam_product_signature.png', lifestyleImage: '/images/lifestyle/kadam_lifestyle_signature.png', accent: '#5b2528', sizes: [6, 7, 8, 9, 10],
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

function App() {
  const [page, setPage] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('kadam-theme') === 'dark');
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(localStorage.getItem('kadam-cart') || '[]'));
  const [wishlist, setWishlist] = useState<string[]>(() => JSON.parse(localStorage.getItem('kadam-wishlist') || '[]'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState('');
  const selectedProduct = products.find((product) => product.id === page.slice('product/'.length)) ?? products[0];
  const [query, setQuery] = useState('');

  useEffect(() => { localStorage.setItem('kadam-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { localStorage.setItem('kadam-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('kadam-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { if (toast) { const timer = window.setTimeout(() => setToast(''), 2400); return () => window.clearTimeout(timer); } }, [toast]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const searchResults = useMemo(() => products.filter((product) => `${product.name} ${product.style}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const navigate = (destination: string) => { setPage(destination); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toggleWishlist = (id: string) => { setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); setToast(wishlist.includes(id) ? 'Removed from wishlist' : 'Added to wishlist'); };
  const addToCart = (product: Product, size = 8) => { setCart((current) => { const match = current.find((item) => item.id === product.id && item.size === size); return match ? current.map((item) => item === match ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, size, quantity: 1 }]; }); setToast(`${product.name} added to cart`); setDrawerOpen(true); };
  const changeQuantity = (id: string, size: number, change: number) => setCart((current) => current.map((item) => item.id === id && item.size === size ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  const removeFromCart = (id: string, size: number) => setCart((current) => current.filter((item) => !(item.id === id && item.size === size)));

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
          <button className="icon-button hide-mobile" aria-label="Account" onClick={() => navigate('account')}><UserRound size={18} /></button>
          <button className="icon-button" aria-label="Wishlist" onClick={() => navigate('wishlist')}><Heart size={18} fill={wishlist.length ? 'currentColor' : 'none'} /></button>
          <button className="bag-button" aria-label="Open cart" onClick={() => setDrawerOpen(true)}><ShoppingBag size={18} /><b>{cartCount}</b></button>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme"><span className={dark ? 'sun' : 'moon'} /></button>
        </div>
      </header>
      {searchOpen && <div className="search-bar"><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search KADAM..." /><button onClick={() => setSearchOpen(false)}><X size={18} /></button>{query && <div className="search-results">{searchResults.map((product) => <button key={product.id} onClick={() => { navigate(`product/${product.id}`); setSearchOpen(false); }}><img src={product.image} alt="" /><span className="search-result-copy"><strong>{product.name}</strong><small>{product.style}</small></span><ArrowRight size={14} /></button>)}{!searchResults.length && <p>No pieces found. Try another story.</p>}</div>}</div>}

      {page === 'home' && <Home navigate={navigate} products={products} toggleWishlist={toggleWishlist} wishlist={wishlist} addToCart={addToCart} dark={dark} />}
      {page === 'shop' && <Shop products={products} navigate={navigate} toggleWishlist={toggleWishlist} wishlist={wishlist} addToCart={addToCart} />}
      {page.startsWith('product/') && <ProductPage product={selectedProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} navigate={navigate} />}
      {page === 'art-stories' && <ArtStories navigate={navigate} />}
      {page === 'lookbook' && <Lookbook products={products} />}
      {page === 'our-story' && <OurStory navigate={navigate} />}
      {page === 'customize' && <Customizer addToCart={addToCart} />}
      {page === 'wishlist' && <Wishlist products={products.filter((product) => wishlist.includes(product.id))} navigate={navigate} toggleWishlist={toggleWishlist} addToCart={addToCart} />}
      {page === 'cart' && <CartPage cart={cart} subtotal={subtotal} changeQuantity={changeQuantity} removeFromCart={removeFromCart} navigate={navigate} />}
      {page === 'checkout' && <Checkout subtotal={subtotal} cart={cart} navigate={navigate} />}
      {page === 'account' && <Account navigate={navigate} />}

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

function OurStory({ navigate }: { navigate: (page: string) => void }) { return <main className="our-story page-shell"><div className="page-hero"><p className="eyebrow">The house of KADAM</p><h1>Our <em>story.</em></h1><p>Indian art has always told stories. KADAM gives those stories a new way to walk.</p></div><div className="story-timeline">{['Indian art', 'Culture', 'Inspiration', 'Design', 'KADAM'].map((item, index) => <div className={index === 4 ? 'timeline-item last' : 'timeline-item'} key={item}><span>0{index + 1}</span><div><h2>{item}</h2><p>{index === 0 ? 'A visual inheritance passed from one hand to another.' : index === 1 ? 'The details that make a place feel like home.' : index === 2 ? 'Looking closer at the lines, shapes and stories around us.' : index === 3 ? 'Translating memory into a silhouette for now.' : 'A sneaker with somewhere to go.'}</p></div></div>)}</div><section className="philosophy"><div><p className="eyebrow">A considered approach</p><h2>Not heritage<br /><em>preserved.</em><br />Heritage in motion.</h2></div><div><p>KADAM exists at the meeting point of two energies: the patience of traditional making and the restless rhythm of contemporary life.</p><p>We work with visual languages rooted in India, not to replicate them, but to let their spirit travel. On pavements, through train stations, into the everyday.</p><div className="principles"><span>Thoughtful packaging</span><span>Durable construction</span><span>Designed for long-term wear</span></div><button className="button primary" onClick={() => navigate('shop')}>Find your pair <ArrowRight size={16} /></button></div></section></main>; }

function Customizer({ addToCart }: { addToCart: (product: Product) => void }) { const [colour, setColour] = useState('Cream'); const [style, setStyle] = useState('Warli'); const [laces, setLaces] = useState('Maroon'); const [sole, setSole] = useState('Brown'); const choices = [['Sneaker colour', ['Cream', 'Black', 'Tan'], colour, setColour], ['Art style', ['Warli', 'Madhubani', 'Gond', 'Kalamkari'], style, setStyle], ['Laces', ['Cream', 'Maroon', 'Brown'], laces, setLaces], ['Sole', ['Cream', 'Brown', 'Black'], sole, setSole]] as const; return <main className="customizer page-shell"><div className="page-hero"><p className="eyebrow">The personal edition</p><h1>Create your<br /><em>KADAM.</em></h1><p>Make the story yours.</p></div><div className="custom-layout"><div className="custom-preview"><div className={`custom-shoe large ${colour.toLowerCase()} ${sole.toLowerCase()}`}><div className="shoe-top" /><div className="shoe-sole" /><span>{style}</span></div><div className="preview-caption"><span>YOUR KADAM</span><strong>01 / 01</strong></div></div><div className="custom-controls">{choices.map(([label, options, value, setter]) => <div className="choice-group" key={label}><div className="choice-heading"><strong>{label}</strong><span>{value}</span></div><div className="choice-options">{options.map((option) => <button className={value === option ? 'selected' : ''} key={option} onClick={() => setter(option)}>{option}{value === option && <Check size={14} />}</button>)}</div></div>)}<div className="custom-total"><span>YOUR KADAM</span><strong>{money(3499)}</strong></div><button className="button primary full" onClick={() => addToCart({ ...products[5], name: `KADAM CUSTOM / ${style.toUpperCase()}` })}>Add to cart <ShoppingBag size={16} /></button><button className="reset-button" onClick={() => { setColour('Cream'); setStyle('Warli'); setLaces('Maroon'); setSole('Brown'); }}>Reset configuration</button></div></div></main>; }

function Wishlist({ products: items, navigate, toggleWishlist, addToCart }: { products: Product[]; navigate: (page: string) => void; toggleWishlist: (id: string) => void; addToCart: (product: Product) => void }) { return <main className="page-shell"><div className="page-hero"><p className="eyebrow">Saved for later</p><h1>My <em>wishlist.</em></h1><p>{items.length ? 'The pieces you keep coming back to.' : 'Your next favourite pair belongs here.'}</p></div>{items.length ? <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} toggleWishlist={toggleWishlist} wishlisted addToCart={addToCart} onOpen={() => navigate(`product/${product.id}`)} />)}</div> : <div className="empty-state"><Heart size={30} /><p>Your wishlist is waiting for a story.</p><button className="button primary" onClick={() => navigate('shop')}>Explore the collection</button></div>}</main>; }

function CartDrawer({ cart, subtotal, changeQuantity, removeFromCart, navigate, close }: { cart: CartItem[]; subtotal: number; changeQuantity: (id: string, size: number, change: number) => void; removeFromCart: (id: string, size: number) => void; navigate: (page: string) => void; close: () => void }) { return <div className="drawer-backdrop" onClick={close}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><h2>Your cart <span>({cart.length})</span></h2><button className="icon-button" onClick={close}><X size={18} /></button></div>{cart.length ? <><div className="drawer-items">{cart.map((item) => <CartLine key={`${item.id}-${item.size}`} item={item} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />)}</div><div className="drawer-bottom"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping calculated at checkout.</p><button className="button primary full" onClick={() => { close(); navigate('checkout'); }}>Checkout <ArrowRight size={16} /></button><button className="text-button center" onClick={() => { close(); navigate('cart'); }}>View full cart</button></div></> : <div className="empty-state"><ShoppingBag size={28} /><p>Your cart is ready for its first story.</p><button className="button primary" onClick={close}>Continue shopping</button></div>}</aside></div>; }

function CartLine({ item, changeQuantity, removeFromCart }: { item: CartItem; changeQuantity: (id: string, size: number, change: number) => void; removeFromCart: (id: string, size: number) => void }) { return <div className="cart-line"><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><small>Size {item.size}</small><div className="quantity"><button onClick={() => changeQuantity(item.id, item.size, -1)}><Minus size={12} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, item.size, 1)}><Plus size={12} /></button></div></div><div className="line-price"><strong>{money(item.price * item.quantity)}</strong><button onClick={() => removeFromCart(item.id, item.size)}>Remove</button></div></div>; }

function CartPage({ cart, subtotal, changeQuantity, removeFromCart, navigate }: { cart: CartItem[]; subtotal: number; changeQuantity: (id: string, size: number, change: number) => void; removeFromCart: (id: string, size: number) => void; navigate: (page: string) => void }) { return <main className="page-shell"><div className="page-hero compact"><p className="eyebrow">Almost yours</p><h1>Your <em>cart.</em></h1></div><div className="full-cart"><div>{cart.map((item) => <CartLine key={`${item.id}-${item.size}`} item={item} changeQuantity={changeQuantity} removeFromCart={removeFromCart} />)}{!cart.length && <div className="empty-state"><ShoppingBag size={28} /><p>Your cart is empty.</p></div>}</div><div className="cart-summary"><h3>Summary</h3><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><strong>{subtotal >= 2999 ? 'Free' : money(149)}</strong></div><div className="summary-total"><span>Total</span><strong>{money(subtotal + (subtotal >= 2999 || subtotal === 0 ? 0 : 149))}</strong></div><button className="button primary full" onClick={() => navigate('checkout')} disabled={!cart.length}>Checkout <ArrowRight size={16} /></button><button className="text-button center" onClick={() => navigate('shop')}>Continue shopping</button></div></div></main>; }

function Checkout({ subtotal, cart, navigate }: { subtotal: number; cart: CartItem[]; navigate: (page: string) => void }) { const [done, setDone] = useState(false); if (done) return <main className="confirmation page-shell"><div className="confirmation-mark"><Check size={34} /></div><p className="eyebrow">Order confirmed / #KD-26091</p><h1>Your KADAM<br /><em>is on its way.</em></h1><p>Thank you for giving the story somewhere new to go. We’ll keep you posted as your order travels to you.</p><button className="button primary" onClick={() => navigate('shop')}>Continue exploring <ArrowRight size={16} /></button></main>; return <main className="page-shell checkout"><div className="page-hero compact"><p className="eyebrow">A considered finish</p><h1>Check <em>out.</em></h1></div><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setDone(true); }}><CheckoutSection title="Contact"><div className="form-grid"><label>Full name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone<input required placeholder="+91 00000 00000" /></label></div></CheckoutSection><CheckoutSection title="Delivery"><div className="form-grid"><label>Address<input required placeholder="Flat, building, street" /></label><label>City<input required placeholder="Mumbai" /></label><label>State<input required placeholder="Maharashtra" /></label><label>Pincode<input required placeholder="400001" /></label></div></CheckoutSection><CheckoutSection title="Payment"><div className="payment-options"><label><input type="radio" name="payment" defaultChecked /> UPI <span>Recommended</span></label><label><input type="radio" name="payment" /> Card</label><label><input type="radio" name="payment" /> Cash on delivery</label></div></CheckoutSection><button className="button primary" type="submit">Place order <ArrowRight size={16} /></button></form><div className="checkout-summary"><h3>Order summary</h3>{cart.map((item) => <div className="summary-line" key={`${item.id}-${item.size}`}><span>{item.name}<small>Size {item.size} × {item.quantity}</small></span><strong>{money(item.price * item.quantity)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div></div></div></main>; }
function CheckoutSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="checkout-section"><h3>{title}</h3>{children}</section>; }
function Account({ navigate }: { navigate: (page: string) => void }) { return <main className="page-shell account"><div className="page-hero"><p className="eyebrow">The KADAM club</p><h1>Your <em>account.</em></h1><p>Sign in to keep your orders and saved pieces close.</p></div><div className="account-box"><UserRound size={28} /><h2>Welcome to KADAM</h2><p>Account access is ready for your next chapter.</p><button className="button primary" onClick={() => navigate('shop')}>Continue shopping <ArrowRight size={16} /></button></div></main>; }

function Footer({ navigate }: { navigate: (page: string) => void }) { return <footer><div className="footer-top"><div><button className="wordmark footer-logo" onClick={() => navigate('home')}>KADAM<span>▲</span></button><p>India, reimagined.</p><div className="socials"><Instagram size={17} /><span>pinterest</span></div></div><div className="footer-news"><p className="eyebrow">Stay in the loop</p><h3>New drops, stories<br />and KADAM updates.</h3><div className="newsletter"><input placeholder="Enter your email" type="email" /><button>Join</button></div></div><div className="footer-links"><div><span>Shop</span><button onClick={() => navigate('shop')}>Signature collection</button><button onClick={() => navigate('shop')}>New arrivals</button><button onClick={() => navigate('shop')}>Best sellers</button></div><div><span>About</span><button onClick={() => navigate('our-story')}>Our story</button><button onClick={() => navigate('art-stories')}>Art stories</button><button onClick={() => navigate('lookbook')}>Lookbook</button></div><div><span>Support</span><button>Contact</button><button>Shipping</button><button>Returns</button></div></div></div><div className="footer-bottom"><span>© 2026 KADAM</span><span>Made with intention in India</span><span>Privacy / Terms</span></div></footer>; }

export default App;
