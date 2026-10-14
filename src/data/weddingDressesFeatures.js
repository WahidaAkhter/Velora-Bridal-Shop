/**
 * Comprehensive Wedding Dresses Features Data
 * Unique high-fashion thoughts, bespoke editorial descriptions, imagery, and curated gowns
 * for every option across the 5 categories (By Type, By Silhouette, By Neckline/Sleeve, By Style, By Fabrication).
 */

export const WEDDING_DRESS_OPTIONS_DATA = {
  // ==========================================
  // 1. BY TYPE
  // ==========================================
  'SIGNATURE STYLES': {
    category: 'BY TYPE',
    title: 'Signature Styles',
    badge: 'Aura Luxe Icons',
    tagline: 'The defining silhouettes of our Paris & Milan ateliers',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'Aura Luxe Signature Styles represent our design philosophy: sculptural corsetry seamlessly merged with whisper-light French illusion tulle. Each signature gown requires over 180 hours of hand-appliqué artistry, celebrating the bride who commands presence without sacrificing timeless grace.',
    stylistNote: 'Pair with an heirloom cathedral lace veil and diamond drop earrings for a majestic altar reveal.',
    curatedGowns: [
      {
        id: 'sig-1',
        name: 'The Sovereign Basque Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Basque Waist Ballgown',
        fabric: 'Chantilly Lace & Italian Tulle',
        description: 'Our house icon. Features a dramatic drop V-waistline, internal 14-piece steel boning, and hand-cut lace climbing up sheer cap sleeves.'
      },
      {
        id: 'sig-2',
        name: 'Lace Dream Sovereign',
        subtitle: 'Intricate corded lace with royal cathedral train',
        price: 2199,
        originalPrice: 2499,
        image: '/images/bridal/featured-lace-dream.jpg',
        silhouette: 'A-Line / Cathedral Train',
        fabric: 'French Corded Lace',
        description: 'Deep V-neckline framed in scalloped guipure lace, drifting into a luminous sheer back with covered silk buttons.'
      },
      {
        id: 'sig-3',
        name: 'Celeste Diamond Mermaid',
        subtitle: 'Architectural hour-glass contour with tiered train',
        price: 2650,
        originalPrice: 2990,
        image: '/images/bridal/style-mermaid.jpg',
        silhouette: 'Mermaid / Trumpet',
        fabric: 'Embroidered Net & Organza',
        description: 'Engineered with hidden power-mesh support to accentuate feminine curves before bursting into cascading ruffles at the knee.'
      }
    ]
  },

  'QUICK SHIP STYLES': {
    category: 'BY TYPE',
    title: 'Quick Ship Styles',
    badge: 'Express Faster Delivery',
    tagline: 'Hand-picked designer gowns produced and dispatched in a shorter timeframe',
    heroImage: '/images/quick-ship/lissy-1.jpg',
    thought: "We understand that not all brides have the luxury of time. Here's your hand-picked selection of gowns which can be produced in an accelerated timeframe. No compromise to quality or our same high atelier standards, internal boning, and couture tailoring.",
    stylistNote: 'Each Quick Ship gown is precision tailored in our atelier for priority dispatch in 2–3 weeks, ideal for destination weddings, civil ceremonies, and spontaneous celebrations.',
    curatedGowns: [
      {
        id: 'qs-lissy',
        name: 'LISSY',
        subtitle: 'Where romance and simplicity meet in lightweight ethereal organza',
        price: 2450,
        originalPrice: 2800,
        image: '/images/quick-ship/lissy-1.jpg',
        hoverImage: '/images/quick-ship/lissy-2.jpg',
        silhouette: 'A-Line / Modern Basque Waist',
        fabric: 'Signature Ethereal Organza & Soft Tulle',
        neckline: 'Off-The-Shoulder Draped Organza Cuff',
        description: 'Where romance and simplicity meet, you will find our Lissy wedding dress from our Solara collection. Crafted in signature organza with an asymmetric pleated bodice, modern Basque waist, and draped off-the-shoulder cuff.'
      },
      {
        id: 'qs-nelson',
        name: 'NELSON',
        subtitle: 'Liquid heavy stretch satin with fluid cowl neckline & modern column',
        price: 2250,
        originalPrice: 2550,
        image: '/images/quick-ship/nelson-1.jpg',
        hoverImage: '/images/quick-ship/nelson-2.jpg',
        silhouette: 'Sheath / Fluid Column / Fit & Flare',
        fabric: 'Heavy Liquid Stretch Satin & Jersey Lining',
        neckline: 'Draped Cowl Neckline & Off-The-Shoulder Straps',
        description: 'Effortless modern siren allure. Features liquid heavy stretch satin, draped cowl neckline, off-the-shoulder swags, and a statuesque fluid train.'
      },
      {
        id: 'qs-wendall',
        name: 'WENDALL',
        subtitle: 'Strapless drop-waist ballgown in silk mikado with sheer neck scarf',
        price: 2750,
        originalPrice: 3100,
        image: '/images/quick-ship/wendall-1.jpg',
        hoverImage: '/images/quick-ship/wendall-2.jpg',
        silhouette: 'Drop-Waist Ballgown / Basque Corset',
        fabric: 'Lustrous Silk Mikado & Structured Taffeta',
        neckline: 'Architectural Straight Strapless',
        description: 'Modern royal grandeur. Sculpted basque drop-waist corset erupting into symmetrical mikado box pleats, paired with an editorial sheer tulle neck scarf.'
      },
      {
        id: 'qs-opera',
        name: 'OPERA',
        subtitle: 'Basque waist corset with pleated sweetheart neckline & floating organza',
        price: 2650,
        originalPrice: 2990,
        image: '/images/quick-ship/opera-1.jpg',
        hoverImage: '/images/quick-ship/opera-2.jpg',
        silhouette: 'A-Line / Basque Waist Ballgown',
        fabric: 'Crinkle Silk Organza & Featherlight Tulle',
        neckline: 'Sweetheart with Micro-Pleated Detachable Sleeves',
        description: 'A lyrical romantic masterpiece. Fine asymmetrical micro-pleated sweetheart neckline, hourglass basque boning, and detachable pleated arm swags over a cloud skirt.'
      },
      {
        id: 'qs-walker',
        name: 'WALKER',
        subtitle: '3D botanical lace appliqués, illusion sweetheart bodice & puff sleeves',
        price: 2850,
        originalPrice: 3250,
        image: '/images/quick-ship/walker-1.jpg',
        hoverImage: '/images/quick-ship/walker-2.jpg',
        silhouette: 'Romantic A-Line / Princess Skirt',
        fabric: '3D Embroidered Floral Lace & Soft Tulle',
        neckline: 'Sweetheart Plunge with Exposed Sheer Boning',
        description: 'Botanical fairytale dream with hand-cut 3D blossoms, sheer illusion boned corset, and romantic detachable blouson puff sleeves.'
      },
      {
        id: 'qs-ozari',
        name: 'OZARI',
        subtitle: 'Exposed basque corset with ruffled tulle trim, vine lace & neck scarf',
        price: 2950,
        originalPrice: 3350,
        image: '/images/quick-ship/ozari-1.jpg',
        hoverImage: '/images/quick-ship/ozari-2.jpg',
        silhouette: 'Basque Waist A-Line / Modern Ballgown',
        fabric: 'Embroidered Corded Lace & French Illusion Tulle',
        neckline: 'Strapless with Ruffled Tulle Edging & Matching Scarf Collar',
        description: 'High-couture structure meets poetic romance. Vertical exposed boning overlaid with hand-placed lace, micro-pleated neckline ruffle, and silk illusion scarf.'
      },
      {
        id: 'qs-thane-cr',
        name: 'THANE CR',
        subtitle: 'Matte crepe mermaid with sweetheart plunge & detachable long lace sleeves',
        price: 2550,
        originalPrice: 2890,
        image: '/images/quick-ship/thane-cr-1.jpg',
        hoverImage: '/images/quick-ship/thane-cr-2.jpg',
        silhouette: 'Fit and Flare / Sleek Mermaid',
        fabric: 'French Matte Crepe & Chantilly Lace',
        neckline: 'Classic Sweetheart with Subtle Plunge',
        description: 'Ultra-feminine sexy signature design. Vine lace over Chantilly sheer bodice, modern V-shaped Basque waist, sleek crepe skirt, and detachable long fitted lace sleeves.'
      },
      {
        id: 'qs-thane',
        name: 'THANE',
        subtitle: 'All-over sequin embroidered lace mermaid with cathedral illusion train',
        price: 2790,
        originalPrice: 3150,
        image: '/images/quick-ship/thane-1.jpg',
        hoverImage: '/images/quick-ship/thane-2.jpg',
        silhouette: 'Fit and Flare / Sculpted Hourglass Mermaid',
        fabric: 'All-Over Sequin Embroidered Chantilly Lace',
        neckline: 'Plunging Sweetheart Strapless',
        description: 'The quintessential showstopper. Shimmering all-over sequin botanical lace, internal structural boning, detachable long lace sleeves, and an 80-inch illusion lace train.'
      }
    ]
  },

  'NEW DRESSES': {
    category: 'BY TYPE',
    title: 'New Dresses',
    badge: 'Paris Couture Arrivals',
    tagline: 'Fresh from the atelier: avant-garde cuts and celestial textures',
    heroImage: '/images/bridal/style-sparkle-beaded.jpg',
    thought: 'The newest chapter of Aura Luxe bridal embraces celestial radiance and dimensional botany. We have pushed fabric engineering with ultra-fine crystal threads, detachable cathedral trains, and innovative basque waistlines that look effortlessly regal.',
    stylistNote: 'Pair with crystal bridal drop earrings and a sleek bridal chignon to keep the focus on the modern neckline.',
    curatedGowns: [
      {
        id: 'new-1',
        name: 'Lumière Crystal Chandelier Gown',
        subtitle: 'Hand-sewn Swarovski crystals on shimmering net',
        price: 3450,
        originalPrice: 3890,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Couture Grand Ballgown',
        fabric: 'Crystal-Encrusted Organza',
        description: 'Reflects golden candlelight with every breath. Features a corset bodice, off-shoulder cap straps, and tiered crinoline support.'
      },
      {
        id: 'new-2',
        name: 'Genevieve Off-Shoulder Ballgown',
        subtitle: 'Draped silk tulle straps with 3D blossom vines',
        price: 2790,
        originalPrice: 3100,
        image: '/images/bridal/style-off-shoulder.jpg',
        silhouette: 'Full Ballgown',
        fabric: 'Hand-Cut Floral Lace',
        description: 'Romantic draping framing the decolletage, leading down to hand-embroidered vines that trail onto a royal 80-inch train.'
      },
      {
        id: 'new-3',
        name: 'Aurelia High-Neck Royal Gown',
        subtitle: 'Victorian illusion collar with pearl button cascade',
        price: 2950,
        originalPrice: 3300,
        image: '/images/bridal/style-high-neck.jpg',
        silhouette: 'Royal Ballgown',
        fabric: 'Alençon Lace & Silk Faille',
        description: 'Grace Kelly elegance reinterpreted for the modern era. Long lace sleeves and an open teardrop back detail.'
      }
    ]
  },

  'ALL DRESSES': {
    category: 'BY TYPE',
    title: 'All Dresses',
    badge: 'Master Archive',
    tagline: 'Explore the complete Aura Luxe bridal collection',
    heroImage: '/images/bridal/featured-lace-dream.jpg',
    thought: 'Every woman possesses a unique bridal aura. Our comprehensive master collection spans from featherweight boho chiffons to dramatic royal ballgowns encrusted in crystal, unified by flawless Parisian tailoring and premium materials.',
    stylistNote: 'Use our silhouette and fabrication filters to narrow down your dream gown based on your venue and personal aesthetic.',
    curatedGowns: [
      {
        id: 'all-1',
        name: 'The Sovereign Basque Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Basque Waist Ballgown',
        fabric: 'Chantilly Lace',
        description: 'Renaissance drop waist with internal boning and sweeping cathedral train.'
      },
      {
        id: 'all-2',
        name: 'Satin Minimalist Slip Gown',
        subtitle: 'Liquid heavy silk satin with low cowl back',
        price: 1899,
        originalPrice: 2100,
        image: '/images/bridal/featured-satin-elegance.jpg',
        silhouette: 'Fluid Column',
        fabric: 'Heavy Silk Satin',
        description: 'Pure liquid drape designed for effortless modern bride poise.'
      },
      {
        id: 'all-3',
        name: 'Coastal Bohemian Lace Gown',
        subtitle: 'Barefoot luxury in silk chiffon and crochet lace',
        price: 1980,
        originalPrice: 2250,
        image: '/images/bridal/style-boho-beach.jpg',
        silhouette: 'Ethereal A-Line',
        fabric: 'Silk Chiffon & Crochet Lace',
        description: 'Delicate sheer cutouts and flutter movement crafted for ocean air and golden hour ceremonies.'
      }
    ]
  },

  'ALL COLLECTIONS': {
    category: 'BY TYPE',
    title: 'All Collections',
    badge: 'Curated Capsule Series',
    tagline: 'Four distinct worlds of romance and craftsmanship',
    heroImage: '/images/bridal/lulus-fall-in-love.jpg',
    thought: 'Our creations are organized into seasonal bridal capsules: The Royal Heritage (monumental cathedral silhouettes), Mediterranean Solstice (airy lace and seaside ease), Parisian Minimalist (sculptural satin drapes), and Celestial Starlight (crystal radiance).',
    stylistNote: 'Consult our digital lookbooks to discover which collection harmonizes with your wedding destination.',
    curatedGowns: [
      {
        id: 'col-1',
        name: 'Royal Heritage Ballgown',
        subtitle: 'Monumental volume with hand-stitched lace heraldry',
        price: 3100,
        originalPrice: 3500,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Royal Ballgown',
        fabric: 'Silk Organza & Brocade',
        description: 'Inspired by European royal archives with intricate gold and ivory threading.'
      },
      {
        id: 'col-2',
        name: 'Mediterranean Solstice Gown',
        subtitle: 'Fluid tiered skirt with botanical crochet bodice',
        price: 1980,
        originalPrice: 2250,
        image: '/images/bridal/style-boho-beach.jpg',
        silhouette: 'Boho Flare',
        fabric: 'Silk Chiffon',
        description: 'Designed for warm sea breezes, alfresco dinners, and barefoot sunset vows.'
      },
      {
        id: 'col-3',
        name: 'Parisian Minimalist Column',
        subtitle: 'Pure sculptural heavy silk with dramatic slit',
        price: 1899,
        originalPrice: 2100,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Sheath Column',
        fabric: 'Silk Crepe',
        description: 'Clean architectural restraint capturing the cool elegance of modern Paris.'
      }
    ]
  },

  'SIZE CHART': {
    category: 'BY TYPE',
    title: 'Size Chart & Atelier Measurements',
    badge: 'Bespoke Fit Studio',
    tagline: 'Precision couture sizing calibrated for a sculpted bridal silhouette',
    heroImage: '/images/bridal/hero-bride-clean.jpg',
    isSpecialView: 'size-chart',
    thought: 'Bridal gowns are tailored to your unique proportions, which typically differ from high-street everyday sizing. Our atelier sizes are cut to accommodate corsetry, breast cup architecture, and natural waist contours with precision seam allowances for alteration ease.',
    stylistNote: 'Measure over the exact undergarments you plan to wear on your wedding day for millimeter-level accuracy.',
    curatedGowns: []
  },

  'LOOKBOOKS': {
    category: 'BY TYPE',
    title: 'Editorial Lookbooks',
    badge: 'Volume IV Runway Edition',
    tagline: 'Photographed on location at Château de Chantilly & Villa Balbiano',
    heroImage: '/images/bridal/lulus-forever-after.jpg',
    isSpecialView: 'lookbooks',
    thought: 'Immerse yourself in our cinematic editorial spreads. Captured through natural film light across grand Italian villas and historic French estates, our lookbooks reveal how light dances across each fabric in motion.',
    stylistNote: 'Save your favorite images to share with your bridal stylist during your private fitting consultation.',
    curatedGowns: []
  },

  // ==========================================
  // 2. BY SILHOUETTE
  // ==========================================
  'A-LINE': {
    category: 'BY SILHOUETTE',
    title: 'A-Line Gowns',
    badge: 'Universally Flattering',
    tagline: 'Effortless fluid balance that elongates the natural silhouette',
    heroImage: '/images/bridal/featured-lace-dream.jpg',
    thought: 'The A-Line silhouette is bridal perfection: it gently hugs the ribcage and natural waist before gracefully expanding outward like the letter "A". It balances shoulders and hips effortlessly, offering supreme comfort from the altar walk to the dance floor.',
    stylistNote: 'An ideal silhouette for outdoor ceremonies, historic chateaus, and traditional cathedrals alike.',
    curatedGowns: [
      {
        id: 'aline-1',
        name: 'Lace Dream A-Line',
        subtitle: 'Scalloped French lace with flowing tulle skirt',
        price: 2199,
        originalPrice: 2499,
        image: '/images/bridal/featured-lace-dream.jpg',
        silhouette: 'A-Line',
        fabric: 'French Corded Lace',
        description: 'Graceful flowing lines with a cathedral train and soft blush illusion lining.'
      },
      {
        id: 'aline-2',
        name: 'Floral Fantasy A-Line',
        subtitle: 'Dimensional blossom petals and champagne undertones',
        price: 2299,
        originalPrice: 2599,
        image: '/images/bridal/featured-floral-fantasy.jpg',
        silhouette: 'Romantic A-Line',
        fabric: 'Embroidered Organza',
        description: 'Hand-sewn petals that seem to flutter in the breeze across a sweeping skirt.'
      }
    ]
  },

  'PRINCESS': {
    category: 'BY SILHOUETTE',
    title: 'Princess Silhouette',
    badge: 'Fairy Tale Wonder',
    tagline: 'Soft layered volume evoking regal European monarchies',
    heroImage: '/images/bridal/style-sparkle-beaded.jpg',
    thought: 'The Princess silhouette creates breathtaking wonder with light, cloud-like density. Built with featherweight horsehair crinoline and ethereal French tulle, it delivers monumental volume without weighing down the bride.',
    stylistNote: 'Complement with a sparkling tiara or crystal headband to honor the royal tradition.',
    curatedGowns: [
      {
        id: 'prin-1',
        name: 'Aura Princess Starlight Gown',
        subtitle: 'Crystal-studded corset with tiered organza volume',
        price: 3200,
        originalPrice: 3600,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Princess Gown',
        fabric: 'Glitter Tulle & Crystals',
        description: 'Shimmers like diamonds under grand ballroom chandeliers with full crinoline architecture.'
      },
      {
        id: 'prin-2',
        name: 'Rose Princess Romance Gown',
        subtitle: 'Soft blush rose quartz layers with exposed boning',
        price: 2250,
        originalPrice: 2500,
        image: '/images/bridal/color-blush-pink.jpg',
        silhouette: 'Princess Ballgown',
        fabric: 'Hand-Ruched Tulle',
        description: 'Tender rose-tinted tulle layers that impart an angelic, radiant warmth.'
      }
    ]
  },

  'BALLGOWN': {
    category: 'BY SILHOUETTE',
    title: 'Ballgown Gowns',
    badge: 'High Drama & Majesty',
    tagline: 'Couture architectural fullness built for grand entrances',
    heroImage: '/images/bridal/style-off-shoulder.jpg',
    thought: 'The ballgown is the undisputed queen of bridal fashion. Featuring a firmly tailored corset bodice that contrasts with a sweeping, voluminous skirt, it creates an unmistakable hourglass illusion that commands reverence in monumental venues.',
    stylistNote: 'Essential for high-ceiling ballrooms, cathedral aisles, and historic estate weddings.',
    curatedGowns: [
      {
        id: 'ball-1',
        name: 'The Versailles Sovereign Ballgown',
        subtitle: 'Off-shoulder draped straps with floral embroidery',
        price: 2790,
        originalPrice: 3100,
        image: '/images/bridal/style-off-shoulder.jpg',
        silhouette: 'Classic Ballgown',
        fabric: 'Chantilly Lace & Organza',
        description: 'Draped decolletage straps and a dramatic 75-inch sweeping cathedral train.'
      },
      {
        id: 'ball-2',
        name: 'Ivory Royal Ballgown',
        subtitle: 'Sweetheart bodice with voluminous cloud tulle',
        price: 2099,
        originalPrice: 2350,
        image: '/images/bridal/color-ivory.jpg',
        silhouette: 'Cathedral Ballgown',
        fabric: 'Italian Net & Satin',
        description: 'Iconic sweetheart neckline with a tailored bodice and lightweight layers of ivory net.'
      }
    ]
  },

  'FIT & FLARE': {
    category: 'BY SILHOUETTE',
    title: 'Fit & Flare Gowns',
    badge: 'Dynamic Sculpt',
    tagline: 'Contours through the hips before releasing midway down the thigh',
    heroImage: '/images/bridal/style-mermaid.jpg',
    thought: 'Fit & Flare provides the sensual hourglass contour of a mermaid gown with substantially greater freedom of movement. It hugs the bust, torso, and hips, gently expanding mid-thigh to allow graceful walking and unconstrained dancing.',
    stylistNote: 'Pair with strappy pearl stilettos and a chapel-length veil that billows behind the flare.',
    curatedGowns: [
      {
        id: 'ff-1',
        name: 'Serena Sculpted Fit & Flare',
        subtitle: 'Geometric lace contouring with illusion low back',
        price: 2350,
        originalPrice: 2650,
        image: '/images/bridal/style-mermaid.jpg',
        silhouette: 'Fit & Flare',
        fabric: 'Guipure Lace',
        description: 'Body-hugging lace with interior stretch crepe lining for comfort and sculpt.'
      },
      {
        id: 'ff-2',
        name: 'Modern Romance Fit & Flare',
        subtitle: 'Sweetheart plunge with botanical vine embroidery',
        price: 2199,
        originalPrice: 2450,
        image: '/images/bridal/featured-modern-romance.jpg',
        silhouette: 'Fit & Flare',
        fabric: 'French Tulle & Lace',
        description: 'Illusion plunge bodice with botanical vine appliques cascading through the skirt flare.'
      }
    ]
  },

  'MERMAID': {
    category: 'BY SILHOUETTE',
    title: 'Mermaid Gowns',
    badge: 'Daring Hourglass Contour',
    tagline: 'Form-fitting down to the knee, exploding into a dramatic flare',
    heroImage: '/images/bridal/style-mermaid.jpg',
    thought: 'The mermaid cut is an unapologetic celebration of feminine architecture. Sculpted with precision vertical boning down past the hips, it cinches close before erupting into a dramatic pooled skirt at the knee. It creates high-fashion red carpet drama.',
    stylistNote: 'Recommended for confident brides seeking a dramatic, showstopping silhouette for evening vows.',
    curatedGowns: [
      {
        id: 'merm-1',
        name: 'The Venetian Mermaid Couture',
        subtitle: 'Intricately beaded bodice with multi-tier ruffled train',
        price: 2650,
        originalPrice: 2990,
        image: '/images/bridal/style-mermaid.jpg',
        silhouette: 'Couture Mermaid',
        fabric: 'Embroidered Lace & Tulle',
        description: 'Hand-encrusted seed pearls and crystals with a magnificent ruffled architectural train.'
      },
      {
        id: 'merm-2',
        name: 'Midnight Celestial Mermaid',
        subtitle: 'Starlight crystal beading on deep navy blue tulle',
        price: 2450,
        originalPrice: 2750,
        image: '/images/bridal/color-midnight-navy.jpg',
        silhouette: 'Mermaid Evening Bridal',
        fabric: 'Deep Navy Crystal Net',
        description: 'A striking sapphire blue mermaid gown dusted in sparkling constellation crystals.'
      }
    ]
  },

  'SHORT': {
    category: 'BY SILHOUETTE',
    title: 'Short & Tea-Length Dresses',
    badge: 'Chic Modern Romance',
    tagline: 'Fashion-forward minis and tea-length skirts for modern celebrations',
    heroImage: '/images/bridal/style-boho-beach.jpg',
    thought: 'Modern weddings have evolved: civil ceremonies at city hall, fashionable rehearsal dinners, and vibrant after-parties demand daring shorter hem lines. Our short bridal collection blends playful energy with uncompromising couture standards.',
    stylistNote: 'Show off statement bridal heels like satin pointed pumps with ankle crystal ribbons.',
    curatedGowns: [
      {
        id: 'sh-1',
        name: 'Parisian Petite Tea Gown',
        subtitle: 'Silk organza sweetheart mini with detachable tulle train',
        price: 1450,
        originalPrice: 1700,
        image: '/images/bridal/style-boho-beach.jpg',
        silhouette: 'Tea-Length / High-Low',
        fabric: 'Silk Organza & Lace',
        description: 'Playful above-the-ankle cut featuring a detachable 50-inch train for versatile reception dancing.'
      },
      {
        id: 'sh-2',
        name: 'Bespoke Satin Mini Blazer Dress',
        subtitle: 'Structured heavy satin double-breasted dress',
        price: 1350,
        originalPrice: 1550,
        image: '/images/bridal/featured-satin-elegance.jpg',
        silhouette: 'Tailored Mini',
        fabric: 'Duchess Satin',
        description: 'Sharp lapels, pearl buttons, and a clean modern hem made for city weddings and post-vow cocktails.'
      }
    ]
  },

  'CORSET': {
    category: 'BY SILHOUETTE',
    title: 'Corset Bodice Gowns',
    badge: 'Artisanal Internal Boning',
    tagline: 'Visible couture boning that cinches and flatters with bespoke support',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'The bridal corset is a masterwork of structural engineering. Using flexible French spiraled steel and padded cups, our corsets contour the waist by up to 2 inches naturally while allowing effortless breathing and posture support.',
    stylistNote: 'Exposed boning pairs exquisitely with illusion mesh and sheer back panels.',
    curatedGowns: [
      {
        id: 'cor-1',
        name: 'The Sovereign Basque Corset Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Corset Ballgown',
        fabric: 'Chantilly Lace & Steel Boning',
        description: 'Exquisite 14-piece exposed boning with hand-applied botanical lace motifs.'
      },
      {
        id: 'cor-2',
        name: 'Ruby Sovereign Corset Gown',
        subtitle: 'Deep wine red with hand-beaded lace corset',
        price: 2550,
        originalPrice: 2890,
        image: '/images/bridal/color-burgundy.jpg',
        silhouette: 'Drop Corset Ballgown',
        fabric: 'Heavy Beaded Lace',
        description: 'Dramatic wine burgundy gown with a firmly corseted bodice and tiered ruffles.'
      }
    ]
  },

  'BASQUE WAIST': {
    category: 'BY SILHOUETTE',
    title: 'Basque Waist Gowns',
    badge: 'Renaissance Royalty',
    tagline: 'V-shaped drop waist that cinches the torso into an elongated hourglass',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'The Basque waist is the most coveted silhouette in modern haute couture bridal. Deriving from 16th-century European court fashion, the waistline dips into a sharp V-point below the belly button, creating an optically lengthened torso and dramatic hip curve.',
    stylistNote: 'Wear with a drop-pendant necklace or bare decolletage to emphasize the vertical geometry.',
    curatedGowns: [
      {
        id: 'basq-1',
        name: 'The Sovereign Basque Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Basque Waist Ballgown',
        fabric: 'Chantilly Lace & Silk Tulle',
        description: 'Our crown jewel. The basque V-waist drop creates an elongated waistline flowing into a grand chapel train.'
      },
      {
        id: 'basq-2',
        name: 'Giselle Basque Tulle Gown',
        subtitle: 'Drop V-waist with crystal piping and sheer sleeves',
        price: 2650,
        originalPrice: 2950,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Basque Princess',
        fabric: 'Glitter Tulle & Crystals',
        description: 'Piped with delicate crystal beads along the basque seam to highlight the waist contour.'
      }
    ]
  },

  'DROP WAIST': {
    category: 'BY SILHOUETTE',
    title: 'Drop Waist Gowns',
    badge: '1920s High Fashion',
    tagline: 'Elongated bodice sitting low on the hip for sleek statuesque drama',
    heroImage: '/images/bridal/style-sparkle-beaded.jpg',
    thought: 'The drop waist rests straight across the upper hips, extending the lines of the upper body before releasing into a full skirt. It offers a vintage-inspired yet aggressively modern silhouette favored by haute couture runways.',
    stylistNote: 'Exceptional on brides with athletic or petite torsos looking to create statuesque vertical presence.',
    curatedGowns: [
      {
        id: 'drop-1',
        name: 'Adelaide Drop-Waist Ballgown',
        subtitle: 'Low horizontal hip seam with pleated skirt',
        price: 2750,
        originalPrice: 3050,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Drop-Waist Ballgown',
        fabric: 'Silk Brocade & Tulle',
        description: 'Seamless low hip contour providing a statuesque runway profile.'
      },
      {
        id: 'drop-2',
        name: 'Blush Drop-Waist Romance',
        subtitle: 'Elongated ruched bodice in soft rose quartz',
        price: 2250,
        originalPrice: 2500,
        image: '/images/bridal/color-blush-pink.jpg',
        silhouette: 'Drop-Waist Flare',
        fabric: 'Hand-Ruched Tulle',
        description: 'Gentle blush tones with elongated horizontal hip boning and cascading hemline.'
      }
    ]
  },

  'STATEMENT BACK': {
    category: 'BY SILHOUETTE',
    title: 'Statement Back Gowns',
    badge: 'Altar-View Drama',
    tagline: 'Architectural cutouts, low cowl drapes, and trails of covered buttons',
    heroImage: '/images/bridal/style-high-neck.jpg',
    thought: 'During your ceremony, your guests spend the vast majority of their time looking at your back. A statement back turns your vows into high art—featuring delicate illusion lace, pearl back necklaces, low keyhole cutouts, or cathedral button cascades.',
    stylistNote: 'Choose an updo or bridal chignon to keep the back details unobstructed.',
    curatedGowns: [
      {
        id: 'back-1',
        name: 'The Altar Teardrop Gown',
        subtitle: 'Open back framed in scalloped illusion lace',
        price: 2950,
        originalPrice: 3300,
        image: '/images/bridal/style-high-neck.jpg',
        silhouette: 'Royal Ballgown',
        fabric: 'Alençon Lace',
        description: 'Features a trail of 65 handmade silk covered buttons extending all the way down to the train edge.'
      },
      {
        id: 'back-2',
        name: 'Elysian Low Cowl Crepe Gown',
        subtitle: 'Plunging open spine with fluid drapery',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'Heavy Crepe',
        description: 'Deep low back plunging to the sacrum with minimalist architectural purity.'
      }
    ]
  },

  // ==========================================
  // 3. BY NECKLINE/SLEEVE
  // ==========================================
  'STRAPLESS': {
    category: 'BY NECKLINE/SLEEVE',
    title: 'Strapless Gowns',
    badge: 'Timeless Decolletage',
    tagline: 'Architectural sweetheart and clean straight cuts framing the shoulders',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'The strapless neckline is the eternal bridal staple. Engineered with internal non-slip silicone bands and steel boning, our strapless gowns stay impeccably secure all evening without requiring constant adjustments.',
    stylistNote: 'Accompany with statement bridal earrings or a lightweight chiffon blusher veil.',
    curatedGowns: [
      {
        id: 'strp-1',
        name: 'Classic Sweetheart Ballgown',
        subtitle: 'Sculpted sweetheart neckline with internal corset',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Sweetheart Ballgown',
        fabric: 'Chantilly Lace',
        description: 'Soft sweetheart curve accentuating the collarbones with structured internal grip.'
      },
      {
        id: 'strp-2',
        name: 'Ivory Sweetheart Classic',
        subtitle: 'Timeless sweetheart bodice in sweeping ivory',
        price: 2099,
        originalPrice: 2350,
        image: '/images/bridal/color-ivory.jpg',
        silhouette: 'Ballgown',
        fabric: 'Italian Net',
        description: 'Pure romantic decolletage framing suited for daytime or evening weddings.'
      }
    ]
  },

  'OFF THE SHOULDER': {
    category: 'BY NECKLINE/SLEEVE',
    title: 'Off The Shoulder Gowns',
    badge: 'Renaissance Romance',
    tagline: 'Draped silk straps resting softly below the shoulder line',
    heroImage: '/images/bridal/style-off-shoulder.jpg',
    thought: 'Off-the-shoulder straps create an evocative frame for the neck and collarbones, echoing the portrait paintings of European nobility. Our straps are elasticated with hidden micro-gussets so you can raise your arms to embrace and dance with complete ease.',
    stylistNote: 'Pairs beautifully with a cathedral veil anchored low in a relaxed bridal updo.',
    curatedGowns: [
      {
        id: 'ots-1',
        name: 'Genevieve Off-Shoulder Ballgown',
        subtitle: 'Draped silk tulle straps with 3D blossom vines',
        price: 2790,
        originalPrice: 3100,
        image: '/images/bridal/style-off-shoulder.jpg',
        silhouette: 'Ballgown',
        fabric: 'Hand-Cut Floral Lace',
        description: 'Tulle straps softly draped below the shoulders with dimensional flower embroidery.'
      },
      {
        id: 'ots-2',
        name: 'Midnight Celestial Off-Shoulder',
        subtitle: 'Sapphire navy tulle with crystal off-shoulder drape',
        price: 2450,
        originalPrice: 2750,
        image: '/images/bridal/color-midnight-navy.jpg',
        silhouette: 'Mermaid',
        fabric: 'Crystal-Embroidered Net',
        description: 'Draped off-shoulder sleeves shimmering with constellation crystals.'
      }
    ]
  },

  'HIGH NECK': {
    category: 'BY NECKLINE/SLEEVE',
    title: 'High Neck Gowns',
    badge: 'Majestic Modesty',
    tagline: 'Victorian illusion collars that radiate aristocratic elegance',
    heroImage: '/images/bridal/style-high-neck.jpg',
    thought: 'High necklines evoke royalty—from Grace Kelly to modern sovereign brides. Cut in sheer French illusion mesh and embroidered with corded guipure, our high necklines elongate the neck while offering sophisticated modesty.',
    stylistNote: 'Wear with pearl drop earrings; skip the necklace to let the high neckline remain the focal point.',
    curatedGowns: [
      {
        id: 'hn-1',
        name: 'Aurelia High-Neck Royal Gown',
        subtitle: 'Victorian illusion collar with pearl button cascade',
        price: 2950,
        originalPrice: 3300,
        image: '/images/bridal/style-high-neck.jpg',
        silhouette: 'Royal Ballgown',
        fabric: 'Alençon Lace & Silk Faille',
        description: 'Sheer high neck collar with scalloped lace that frames the neck with sovereign grace.'
      },
      {
        id: 'hn-2',
        name: 'Verona Mock-Neck Crepe Gown',
        subtitle: 'Clean architectural mock-neck in fluid silk crepe',
        price: 2150,
        originalPrice: 2400,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Sheath Column',
        fabric: 'Heavy Crepe',
        description: 'Minimalist high neck with an open keyhole back, sleek and contemporary.'
      }
    ]
  },

  'STRAPS': {
    category: 'BY NECKLINE/SLEEVE',
    title: 'Straps & Spaghetti Details',
    badge: 'Understated Delicate Support',
    tagline: 'Dainty pearl-encrusted straps and tailored ribbons',
    heroImage: '/images/bridal/style-modern-crepe.jpg',
    thought: 'Delicate straps provide subtle structural support while maintaining the open, airy feeling of a strapless gown. Our straps are often hand-strung with freshwater seed pearls or cut from rolled silk satin to look like whispers of thread.',
    stylistNote: 'Ideal for warm-weather destination weddings, garden venues, and beachside ceremonies.',
    curatedGowns: [
      {
        id: 'strp-opt-1',
        name: 'Elysian Spaghetti Strap Crepe',
        subtitle: 'Double silk straps meeting at a plunging open back',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'French Matte Crepe',
        description: 'Whisper-thin spaghetti straps holding an architectural plunging neckline.'
      },
      {
        id: 'strp-opt-2',
        name: 'Ivory Spaghetti Sweetheart',
        subtitle: 'Dainty satin straps with layered cloud tulle skirt',
        price: 2099,
        originalPrice: 2350,
        image: '/images/bridal/color-ivory.jpg',
        silhouette: 'Classic Ballgown',
        fabric: 'Silk Organza & Tulle',
        description: 'Understated straps that provide effortless dancing security all evening.'
      }
    ]
  },

  'LONG SLEEVES': {
    category: 'BY NECKLINE/SLEEVE',
    title: 'Long Sleeve Gowns',
    badge: 'Cathedral Splendor',
    tagline: 'Fitted Chantilly lace sleeves with French cuff buttoning',
    heroImage: '/images/bridal/style-high-neck.jpg',
    thought: 'Long sleeves offer unmatched bridal grandeur. Constructed from skin-toned sheer illusion net overlaid with hand-placed lace appliques, they appear to float weightlessly on the bride’s arms like delicate botanical tattoos.',
    stylistNote: 'Perfect for autumn, winter, cathedral ceremonies, and historic European weddings.',
    curatedGowns: [
      {
        id: 'ls-1',
        name: 'The Empress Long-Sleeve Gown',
        subtitle: 'Illusion lace sleeves with French buttoned cuffs',
        price: 2950,
        originalPrice: 3300,
        image: '/images/bridal/style-high-neck.jpg',
        silhouette: 'Royal Ballgown',
        fabric: 'Alençon Lace',
        description: 'Fitted sleeves with delicate scalloped wrists and 24 pearl cuff buttons.'
      },
      {
        id: 'ls-2',
        name: 'Genevieve Lace Sleeve Ballgown',
        subtitle: 'Sheer cap to full wrist floral illusion embroidery',
        price: 2790,
        originalPrice: 3100,
        image: '/images/bridal/style-off-shoulder.jpg',
        silhouette: 'Full Ballgown',
        fabric: 'Chantilly Lace',
        description: 'Breathable lightweight sleeves providing modest coverage with couture lightness.'
      }
    ]
  },

  // ==========================================
  // 4. BY STYLE
  // ==========================================
  'MODERN': {
    category: 'BY STYLE',
    title: 'Modern Bridal Style',
    badge: 'Clean Architectural Purity',
    tagline: 'Razor-sharp cuts, minimalist restraint, and unadorned silk luxury',
    heroImage: '/images/bridal/style-modern-crepe.jpg',
    thought: 'The Modern bridal aesthetic strips away unnecessary ornamentation to showcase pure line, fabric, and silhouette. Designed for the contemporary muse who values editorial confidence and architectural elegance.',
    stylistNote: 'Pair with sculptural gold or pearl jewelry and a sleek low bun.',
    curatedGowns: [
      {
        id: 'mod-1',
        name: 'The Paris Loft Crepe Gown',
        subtitle: 'Architectural cowl spine in heavy matte silk crepe',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'Heavy Crepe',
        description: 'Sleek, fluid, and uncluttered. Crafted for metropolitan rooftop and gallery weddings.'
      },
      {
        id: 'mod-2',
        name: 'Satin Minimalist Slip Gown',
        subtitle: 'Liquid heavy silk satin with low cowl back',
        price: 1899,
        originalPrice: 2100,
        image: '/images/bridal/featured-satin-elegance.jpg',
        silhouette: 'Fluid Column',
        fabric: 'Heavy Silk Satin',
        description: 'Timeless satin slip dress reimagined with heavy weight silk and couture internal support.'
      }
    ]
  },

  'ROMANTIC': {
    category: 'BY STYLE',
    title: 'Romantic Bridal Style',
    badge: 'Soft Poetic Whimsy',
    tagline: 'Whispering layers, blushing undertones, and petal-soft movement',
    heroImage: '/images/bridal/featured-lace-dream.jpg',
    thought: 'Romantic style is an ode to heartfelt sentiment. Soft layers of ivory and rose-quartz tulle float like clouds, adorned with scattered florals that evoke sunlit strolls through French country gardens.',
    stylistNote: 'Complement with loose bridal waves, floral hairpins, and a soft petal-pink lip.',
    curatedGowns: [
      {
        id: 'rom-1',
        name: 'Lace Dream Sovereign',
        subtitle: 'Intricate corded lace with royal cathedral train',
        price: 2199,
        originalPrice: 2499,
        image: '/images/bridal/featured-lace-dream.jpg',
        silhouette: 'A-Line',
        fabric: 'French Corded Lace',
        description: 'A poetic celebration of love with scalloped lace borders and soft cathedral drape.'
      },
      {
        id: 'rom-2',
        name: 'Blush Pink Romance Gown',
        subtitle: 'Romantic rose quartz tulle with structured corset',
        price: 2250,
        originalPrice: 2500,
        image: '/images/bridal/color-blush-pink.jpg',
        silhouette: 'Romantic Ballgown',
        fabric: 'Hand-Ruched Tulle',
        description: 'Gentle rose-quartz blushing undertones that glow under golden hour sunlight.'
      }
    ]
  },

  'SIMPLE': {
    category: 'BY STYLE',
    title: 'Simple & Understated',
    badge: 'Effortless Poise',
    tagline: 'Understated elegance where the bride’s radiant natural beauty leads',
    heroImage: '/images/bridal/featured-satin-elegance.jpg',
    thought: 'Simplicity is the ultimate sophistication. When a dress is unadorned with beads or lace, every stitch, seam, and contour must be mathematically flawless. Our simple gowns celebrate pure form and fabric quality.',
    stylistNote: 'Focus on radiant dewy makeup and a single heirloom piece of jewelry.',
    curatedGowns: [
      {
        id: 'simp-1',
        name: 'Satin Minimalist Slip Gown',
        subtitle: 'Liquid heavy silk satin with low cowl back',
        price: 1899,
        originalPrice: 2100,
        image: '/images/bridal/featured-satin-elegance.jpg',
        silhouette: 'Fluid Column',
        fabric: 'Heavy Silk Satin',
        description: 'Unlined pure liquid drape designed for effortless modern bride poise.'
      },
      {
        id: 'simp-2',
        name: 'Elysian Crepe Column',
        subtitle: 'Square-neck modern column in pure matte crepe',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'French Matte Crepe',
        description: 'Chic, wrinkle-resistant matte crepe with an open spine and delicate spaghetti ties.'
      }
    ]
  },

  'ELEGANT': {
    category: 'BY STYLE',
    title: 'Elegant Bridal Style',
    badge: 'Classic Refinement',
    tagline: 'Sophisticated decorum blending traditional dignity with modern grace',
    heroImage: '/images/bridal/color-ivory.jpg',
    thought: 'Elegance never goes out of style. It rejects transient micro-trends in favor of balanced proportions, noble necklines, and exquisite fabric hand-feel that will look just as breathtaking in your photographs 50 years from now.',
    stylistNote: 'Wear with a fingertip-length silk veil and satin closed-toe bridal pumps.',
    curatedGowns: [
      {
        id: 'eleg-1',
        name: 'Ivory Royal Ballgown',
        subtitle: 'Classic sweetheart neckline with cascading tulle',
        price: 2099,
        originalPrice: 2350,
        image: '/images/bridal/color-ivory.jpg',
        silhouette: 'Ballgown',
        fabric: 'Silk Organza & Tulle',
        description: 'A bridal archetype reimagined with quintessential dignity and grace.'
      },
      {
        id: 'eleg-2',
        name: 'The Sovereign Basque Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Basque Waist Ballgown',
        fabric: 'Chantilly Lace',
        description: 'Royal court elegance with balanced proportion and regal carriage.'
      }
    ]
  },

  'BOHO': {
    category: 'BY STYLE',
    title: 'Bohemian Bridal Style',
    badge: 'Free-Spirited Romance',
    tagline: 'Botanical crochet lace, billowy chiffons, and relaxed motion',
    heroImage: '/images/bridal/style-boho-beach.jpg',
    thought: 'The Bohemian bride embraces wild romance, natural outdoor beauty, and effortless ease. Rejecting stiff boning for fluid silk chiffon and crochet lace motifs, our boho gowns are designed to move naturally in the wind.',
    stylistNote: 'Style with loose beach waves, floral combs, and barefoot bridal anklets.',
    curatedGowns: [
      {
        id: 'boho-1',
        name: 'Coastal Bohemian Lace Gown',
        subtitle: 'Barefoot luxury in silk chiffon and crochet lace',
        price: 1980,
        originalPrice: 2250,
        image: '/images/bridal/style-boho-beach.jpg',
        silhouette: 'Boho A-Line',
        fabric: 'Silk Chiffon & Crochet Lace',
        description: 'Delicate sheer cutouts and flutter movement crafted for ocean air and golden hour vows.'
      },
      {
        id: 'boho-2',
        name: 'Lavender Meadow Gown',
        subtitle: 'Whispering lilac layers with crystalline accents',
        price: 2280,
        originalPrice: 2550,
        image: '/images/bridal/color-lavender.jpg',
        silhouette: 'Ethereal A-Line',
        fabric: 'Lilac Chiffon & Net',
        description: 'Infused with botanical meadow luminescence and lightweight tiered motion.'
      }
    ]
  },

  'FLORAL': {
    category: 'BY STYLE',
    title: 'Floral Romance',
    badge: '3D Botanical Artistry',
    tagline: 'Hand-cut silk organza petals and blossoming garden embroideries',
    heroImage: '/images/bridal/featured-floral-fantasy.jpg',
    thought: 'Bringing nature’s most enchanting blooms into couture bridal form. Each gown features laser-cut organza petals and botanical vines that are hand-sewn one by one, creating three-dimensional texture that looks like a blossoming meadow.',
    stylistNote: 'Breathtaking for botanical garden weddings, conservatory vows, and spring vineyard ceremonies.',
    curatedGowns: [
      {
        id: 'flor-1',
        name: 'Floral Fantasy Couture Gown',
        subtitle: 'Dimensional blossom petals and champagne undertones',
        price: 2299,
        originalPrice: 2599,
        image: '/images/bridal/featured-floral-fantasy.jpg',
        silhouette: 'Floral A-Line',
        fabric: '3D Organza Petals & Tulle',
        description: 'Individual hand-sewn petals that appear to drift down the skirt with every step.'
      },
      {
        id: 'flor-2',
        name: 'Genevieve Off-Shoulder Ballgown',
        subtitle: 'Draped silk tulle straps with 3D blossom vines',
        price: 2790,
        originalPrice: 3100,
        image: '/images/bridal/style-off-shoulder.jpg',
        silhouette: 'Ballgown',
        fabric: 'Hand-Cut Floral Lace',
        description: 'Embroidered botanical ivy and climbing roses across an expansive bridal train.'
      }
    ]
  },

  'SEXY': {
    category: 'BY STYLE',
    title: 'Sensual & Daring Style',
    badge: 'Red Carpet Allure',
    tagline: 'Plunging necklines, illusion side panels, and thigh-high slits',
    heroImage: '/images/bridal/style-mermaid.jpg',
    thought: 'Bridal sensuality done with exquisite couture sophistication. Featuring sheer corsetry, low dipping backs, and sculpted contours that celebrate feminine beauty with absolute confidence and grace.',
    stylistNote: 'Pair with high-heeled metallic sandals and glowing bronzed decolletage.',
    curatedGowns: [
      {
        id: 'sxy-1',
        name: 'The Venetian Mermaid Couture',
        subtitle: 'Intricately beaded bodice with multi-tier ruffled train',
        price: 2650,
        originalPrice: 2990,
        image: '/images/bridal/style-mermaid.jpg',
        silhouette: 'Couture Mermaid',
        fabric: 'Embroidered Lace & Tulle',
        description: 'Sculpted hourglass cut hugging every curve before releasing into tiered ruffles.'
      },
      {
        id: 'sxy-2',
        name: 'The Paris Loft Crepe Gown',
        subtitle: 'Deep plunging cowl spine in heavy matte silk crepe',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'Heavy Crepe',
        description: 'A daring low-back dip plunging to the lower spine with effortless allure.'
      }
    ]
  },

  'GLAMOROUS': {
    category: 'BY STYLE',
    title: 'Glamorous Bridal Style',
    badge: 'Opulent High Society',
    tagline: 'Dramatic silhouettes, opulent trains, and glittering crystal artistry',
    heroImage: '/images/bridal/style-sparkle-beaded.jpg',
    thought: 'For the bride who wants all eyes completely captivated. Glamour is achieved through monumental silhouette scale, light-catching beadwork, and cathedral trains designed for historic grand ballrooms and luxury celebrations.',
    stylistNote: 'Wear with an opulent cathedral tiara and diamond jewelry set.',
    curatedGowns: [
      {
        id: 'glam-1',
        name: 'Lumière Crystal Chandelier Gown',
        subtitle: 'Hand-sewn Swarovski crystals on shimmering net',
        price: 3450,
        originalPrice: 3890,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Couture Grand Ballgown',
        fabric: 'Crystal-Encrusted Organza',
        description: 'Dazzling hand-sewn crystals reflecting candlelight in every dimension.'
      },
      {
        id: 'glam-2',
        name: 'Ruby Sovereign Couture Gown',
        subtitle: 'Dramatic deep wine red with hand-beaded lace corset',
        price: 2550,
        originalPrice: 2890,
        image: '/images/bridal/color-burgundy.jpg',
        silhouette: 'Drop Corset Ballgown',
        fabric: 'Heavy Beaded Lace',
        description: 'Dramatic wine burgundy gown with a firmly corseted bodice and tiered ruffles.'
      }
    ]
  },

  'SPARKLE': {
    category: 'BY STYLE',
    title: 'Sparkle & Starlight',
    badge: 'Celestial Radiance',
    tagline: 'Light-catching Swarovski crystals and shimmer-infused tulle',
    heroImage: '/images/bridal/style-sparkle-beaded.jpg',
    thought: 'Like a night sky blanketed in stars. We weave fine metallic fibers directly into the under-layers of French net and hand-apply micro-crystals across the bodice so the gown glows subtly in natural light and blazes under candlelight.',
    stylistNote: 'Stunning in evening receptions, historic candlelit halls, and sunset vows.',
    curatedGowns: [
      {
        id: 'spk-1',
        name: 'Lumière Crystal Chandelier Gown',
        subtitle: 'Hand-sewn Swarovski crystals on shimmering net',
        price: 3450,
        originalPrice: 3890,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Couture Grand Ballgown',
        fabric: 'Crystal-Encrusted Organza',
        description: 'Reflects golden candlelight with every movement for an unforgettable shimmer.'
      },
      {
        id: 'spk-2',
        name: 'Midnight Celestial Starlight Gown',
        subtitle: 'Starlight crystal beading on deep navy blue tulle',
        price: 2450,
        originalPrice: 2750,
        image: '/images/bridal/color-midnight-navy.jpg',
        silhouette: 'Mermaid Evening Bridal',
        fabric: 'Deep Navy Crystal Net',
        description: 'Constellation crystal beading that looks like a starry evening sky.'
      }
    ]
  },

  'BEACH': {
    category: 'BY STYLE',
    title: 'Beach & Destination',
    badge: 'Coastal Barefoot Luxury',
    tagline: 'Featherweight silk chiffon and airy motion made for seaside vows',
    heroImage: '/images/bridal/style-boho-beach.jpg',
    thought: 'Destination and beach weddings demand weightless comfort without sacrificing high-fashion dignity. We select breathable French silks and unlined gauzy chiffons that catch tropical ocean breezes and stay cool in warm climates.',
    stylistNote: 'Pair with barefoot bridal jewels, pearl anklets, and natural salt-water waves.',
    curatedGowns: [
      {
        id: 'bch-1',
        name: 'Coastal Bohemian Lace Gown',
        subtitle: 'Barefoot luxury in silk chiffon and crochet lace',
        price: 1980,
        originalPrice: 2250,
        image: '/images/bridal/style-boho-beach.jpg',
        silhouette: 'Boho A-Line',
        fabric: 'Silk Chiffon & Crochet Lace',
        description: 'Airy sheer side cutouts and a sweeping train engineered to glide over sand.'
      },
      {
        id: 'bch-2',
        name: 'Elysian Crepe Column',
        subtitle: 'Open back minimalist column in breathable crepe',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'French Matte Crepe',
        description: 'Wrinkle-resistant packable fabric that travels flawlessly across continents.'
      }
    ]
  },

  // ==========================================
  // 5. BY FABRICATION
  // ==========================================
  'LACE': {
    category: 'BY FABRICATION',
    title: 'French & Italian Lace',
    badge: 'Centuries of Heritage',
    tagline: 'Chantilly, corded Alençon, and botanical laser-cut guipure',
    heroImage: '/images/bridal/featured-lace-dream.jpg',
    thought: 'Lace is the romantic heart of bridal couture. Woven on historic century-old looms in Northern France, our laces feature delicate corded outlines, eyelash scalloping, and floral medallions that celebrate timeless romance.',
    stylistNote: 'A lace gown pairs best with a clean, raw-edge cathedral veil to avoid visual pattern competition.',
    curatedGowns: [
      {
        id: 'fab-lace-1',
        name: 'Lace Dream Sovereign Gown',
        subtitle: 'Intricate French corded lace over illusion net',
        price: 2199,
        originalPrice: 2499,
        image: '/images/bridal/featured-lace-dream.jpg',
        silhouette: 'A-Line',
        fabric: 'Chantilly & Alençon Lace',
        description: 'Scalloped V-neckline with hand-embroidered corded lace medallions.'
      },
      {
        id: 'fab-lace-2',
        name: 'The Sovereign Basque Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Basque Waist Ballgown',
        fabric: 'Chantilly Lace & Organza',
        description: 'Intricately patterned Chantilly lace climbing up sheer cap sleeves.'
      }
    ]
  },

  'SATIN': {
    category: 'BY FABRICATION',
    title: 'Silk Duchess & Mikado Satin',
    badge: 'Liquid Luster',
    tagline: 'High-density silk satin with sculptural folds and regal sheen',
    heroImage: '/images/bridal/featured-satin-elegance.jpg',
    thought: 'Satin holds form and casts light like liquid mercury. We source heavyweight Italian Duchess satin and Japanese silk Mikado, giving each gown an unmistakable architectural presence and clean, modern crispness.',
    stylistNote: 'Enhance the liquid luster with sleek diamond jewelry and a high-shine satin shoe.',
    curatedGowns: [
      {
        id: 'fab-satin-1',
        name: 'Satin Minimalist Slip Gown',
        subtitle: 'Liquid heavy silk satin with low cowl back',
        price: 1899,
        originalPrice: 2100,
        image: '/images/bridal/featured-satin-elegance.jpg',
        silhouette: 'Fluid Column',
        fabric: 'Heavy Duchess Satin',
        description: 'Pure liquid drape designed for effortless modern poise.'
      },
      {
        id: 'fab-satin-2',
        name: 'Aurelia High-Neck Royal Gown',
        subtitle: 'Victorian illusion collar with silk faille satin skirt',
        price: 2950,
        originalPrice: 3300,
        image: '/images/bridal/style-high-neck.jpg',
        silhouette: 'Royal Ballgown',
        fabric: 'Silk Faille & Alençon Lace',
        description: 'A heavy satin skirt that holds grand architectural cathedral volume.'
      }
    ]
  },

  'TULLE': {
    category: 'BY FABRICATION',
    title: 'Italian Illusion Tulle',
    badge: 'Weightless Clouds',
    tagline: 'Ethereal micro-net layers creating soft, floating volume',
    heroImage: '/images/bridal/color-ivory.jpg',
    thought: 'Tulle embodies airy dreaminess. Made from superfine hexagonal weave netting in Italy, our tulle is cloud-soft against the skin, avoiding the stiffness of commercial synthetic nets while providing voluminous, romantic drift.',
    stylistNote: 'Pair with delicate pearl hair accessories to mirror the weightless texture.',
    curatedGowns: [
      {
        id: 'fab-tulle-1',
        name: 'Ivory Royal Ballgown',
        subtitle: 'Cascading layers of superfine Italian illusion tulle',
        price: 2099,
        originalPrice: 2350,
        image: '/images/bridal/color-ivory.jpg',
        silhouette: 'Classic Ballgown',
        fabric: 'Italian Net & Tulle',
        description: 'Light-as-air skirt consisting of 8 tiered layers of soft ivory netting.'
      },
      {
        id: 'fab-tulle-2',
        name: 'Genevieve Off-Shoulder Ballgown',
        subtitle: 'Draped silk tulle straps with 3D blossom vines',
        price: 2790,
        originalPrice: 3100,
        image: '/images/bridal/style-off-shoulder.jpg',
        silhouette: 'Ballgown',
        fabric: 'Silk Tulle & Floral Lace',
        description: 'Soft tulle draped straps creating a romantic, fairytale impression.'
      }
    ]
  },

  'CREPE': {
    category: 'BY FABRICATION',
    title: 'French Matte Crepe',
    badge: 'Modern Sculpt',
    tagline: 'Streamlined heavy silk crepe with fluid contouring drape',
    heroImage: '/images/bridal/style-modern-crepe.jpg',
    thought: 'French matte crepe is the choice of the modern minimalist. Its pebbled surface absorbs light evenly for a flattering matte finish, while its natural four-way stretch hugs contours and resists travel wrinkling effortlessly.',
    stylistNote: 'Accompany with minimalist drop pearl earrings and a modern cathedral veil.',
    curatedGowns: [
      {
        id: 'fab-crepe-1',
        name: 'The Paris Loft Crepe Gown',
        subtitle: 'Deep plunging cowl spine in heavy matte silk crepe',
        price: 1750,
        originalPrice: 1980,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Modern Column',
        fabric: 'French Matte Crepe',
        description: 'Clean architectural lines with open spine and fluid cathedral drape.'
      },
      {
        id: 'fab-crepe-2',
        name: 'Verona Mock-Neck Crepe Gown',
        subtitle: 'Sculpted sheath silhouette in double-faced crepe',
        price: 2150,
        originalPrice: 2400,
        image: '/images/bridal/style-modern-crepe.jpg',
        silhouette: 'Sheath Column',
        fabric: 'Double-Faced Crepe',
        description: 'Heavy silk crepe that sculpts the hips with clean, seamless lines.'
      }
    ]
  },

  'BEADED': {
    category: 'BY FABRICATION',
    title: 'Hand-Beaded Crystal & Pearls',
    badge: 'Master Embroidery',
    tagline: 'Swarovski crystals, Austrian glass bugle beads, and freshwater pearls',
    heroImage: '/images/bridal/style-sparkle-beaded.jpg',
    thought: 'Every beaded gown is a wearable treasure. Our master embroiderers stitch thousands of crystal beads and freshwater seed pearls by hand over months, creating patterns inspired by starlight, flowing water, and royal heirlooms.',
    stylistNote: 'Under candlelit or chandelier lighting, a beaded gown creates mesmerizing sparkle with every step.',
    curatedGowns: [
      {
        id: 'fab-bead-1',
        name: 'Lumière Crystal Chandelier Gown',
        subtitle: 'Hand-sewn Swarovski crystals on shimmering net',
        price: 3450,
        originalPrice: 3890,
        image: '/images/bridal/style-sparkle-beaded.jpg',
        silhouette: 'Couture Grand Ballgown',
        fabric: 'Crystal-Encrusted Organza',
        description: 'Hand-applied crystal shimmer that illuminates the bride from every angle.'
      },
      {
        id: 'fab-bead-2',
        name: 'The Venetian Mermaid Couture',
        subtitle: 'Intricately beaded bodice with multi-tier ruffled train',
        price: 2650,
        originalPrice: 2990,
        image: '/images/bridal/style-mermaid.jpg',
        silhouette: 'Couture Mermaid',
        fabric: 'Embroidered Lace & Tulle',
        description: 'Heavily beaded bustier with seed pearls and light-reflecting crystals.'
      }
    ]
  },

  'ORGANZA': {
    category: 'BY FABRICATION',
    title: 'Silk Organza',
    badge: 'Architectural Crispness',
    tagline: 'Whisper-sheer silk with structured body for crisp, voluminous tiers',
    heroImage: '/images/bridal/style-basque-waist.jpg',
    thought: 'Silk organza combines sheer translucency with firm structural memory. Unlike soft tulle, organza can be pleated, sculpted into dramatic architectural ruffles, or layered into tiers that maintain crisp volume throughout a long celebration.',
    stylistNote: 'Ideal for brides who adore dramatic volume and high-fashion structural silhouettes.',
    curatedGowns: [
      {
        id: 'fab-org-1',
        name: 'The Sovereign Basque Gown',
        subtitle: 'Sculpted basque corset in French Chantilly lace & organza',
        price: 2850,
        originalPrice: 3200,
        image: '/images/bridal/style-basque-waist.jpg',
        silhouette: 'Basque Waist Ballgown',
        fabric: 'Silk Organza & Chantilly Lace',
        description: 'Crisp organza tiers supporting a dramatic basque waistline.'
      },
      {
        id: 'fab-org-2',
        name: 'Floral Fantasy Organza Gown',
        subtitle: 'Laser-cut silk organza petals on champagne tulle',
        price: 2299,
        originalPrice: 2599,
        image: '/images/bridal/featured-floral-fantasy.jpg',
        silhouette: 'A-Line',
        fabric: 'Silk Organza',
        description: 'Textured organza flowers that flutter softly with natural bridal motion.'
      }
    ]
  }
};
