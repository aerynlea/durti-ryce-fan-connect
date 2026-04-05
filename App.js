import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const hunterLaneProfile = require("./assets/hunter-lane-profile.png");
const moniqueReneeProfile = require("./assets/monique-renee-profile.png");
const deronProfile = require("./assets/deron-profile.png");

const siteLinks = {
  home: "https://durtiryce.com/",
  merch: "https://durtiryce.com/merch/",
  videos: "https://durtiryce.com/videos/",
  booking: "https://durtiryce.com/event-booking/",
  fanClub: "https://durtiryce.com/fan-club-durti-ryce-nation/",
  bronze: "https://durtiryce.com/bronze-member/",
  silver: "https://durtiryce.com/silver-member/",
  gold: "https://durtiryce.com/gold-member/",
  platinum: "https://durtiryce.com/platinum-member/",
  askDeron: "https://durtiryce.com/ask-deron/",
  audio: "https://durtiryce.com/audio/",
  contact: "https://durtiryce.com/contact/",
};

const siteImages = {
  hero:
    "https://images.zoogletools.com/s:bzglfiles/u/748996/df709ad56c92e5827cf08085780af959f8aafc4e/original/durti-ryce-copper-family-promo-1-1.png/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png",
  merch:
    "https://images.zoogletools.com/s:bzglfiles/u/748996/e02e5453f2ea73d9f0aeeec017eef21a80f0b3fd/original/durti-ryce-nation-limited-edition-sale-1.png/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png",
  catalinaFriday:
    "https://images.zoogletools.com/s:bzglfiles/u/748996/44ce0eaad529db4955791d386955d7852446cc3f/original/durti-ryce-ft-deron-mike-phillips-promo-44-1.png/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png",
  catalinaSaturday:
    "https://images.zoogletools.com/s:bzglfiles/u/748996/519f0f5c3dfc8180d6c4a23772a8f9414fe02350/original/dr-promo-monique-renee-45.png/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png",
  spaghettini:
    "https://images.zoogletools.com/s:bzglfiles/u/748996/9617559a53ccf2f68fe81ab249fdf527421b93b6/original/dr-promo-spaghettini-may-2026-2.png/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png",
  newport:
    "https://images.zoogletools.com/s:bzglfiles/u/748996/f64b5f3bc8c8545425fa84bf6e085ddac3194b40/original/durti-ryce-ft-deronjubu.png/!!/b%3AW1sicmVzaXplIiwxMDAwXSxbIm1heCJdLFsid2UiXV0%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png",
  merchCap:
    "https://files.cdn.printful.com/files/c58/c58434acea323ec3e7518507fbdd169b_preview.png",
  merchShirt:
    "https://files.cdn.printful.com/files/aa4/aa4b1c079c913c5b8b605d6ded0f5a2d_preview.png",
  merchMug:
    "https://files.cdn.printful.com/files/603/603cdb03cd77bdfd3b2deae15223fa7d_preview.png",
  merchHoodie:
    "https://files.cdn.printful.com/files/0d3/0d3cdcd8094820740c4654f4f083cad3_preview.png",
};

const socialLinks = [
  { name: "Website", url: siteLinks.home },
  { name: "Band Instagram", url: "https://www.instagram.com/durtiryce/" },
  { name: "Videos", url: siteLinks.videos },
  { name: "Audio", url: siteLinks.audio },
  { name: "Hunter Lane IG", url: "https://www.instagram.com/robertmusic89/" },
  { name: "Monique Renee IG", url: "https://www.instagram.com/uniquemojo/" },
  { name: "Contact", url: siteLinks.contact },
];

const tabs = ["Home", "Shows", "Music", "Merch", "Artists", "Fan Club", "More"];

const shows = [
  {
    title: "Catalina Jazz Club",
    city: "Hollywood, CA",
    date: "April 10, 2026",
    time: "8:30 PM",
    note: "Doors open at 7:00 PM",
    venue: "6725 Sunset Boulevard, Hollywood, CA 90028",
    ticketUrl: "https://www.ticketweb.com/",
    mapUrl: "https://maps.apple.com/?q=6725+Sunset+Boulevard+Hollywood+CA+90028",
    image: siteImages.catalinaFriday,
  },
  {
    title: "Catalina Jazz Club",
    city: "Hollywood, CA",
    date: "April 11, 2026",
    time: "8:30 PM",
    note: "Second night at Catalina",
    venue: "6725 Sunset Boulevard, Hollywood, CA 90028",
    ticketUrl: "https://www.ticketweb.com/",
    mapUrl: "https://maps.apple.com/?q=6725+Sunset+Boulevard+Hollywood+CA+90028",
    image: siteImages.catalinaSaturday,
  },
  {
    title: "Spaghettini Sunday Brunch",
    city: "Seal Beach, CA",
    date: "Spring 2026",
    time: "Brunch Show",
    note: "Tickets available now",
    venue: "3005 Old Ranch Parkway, Seal Beach, CA 90740",
    ticketUrl: "https://www.tix.com/",
    mapUrl: "https://maps.apple.com/?q=3005+Old+Ranch+Parkway+Seal+Beach+CA+90740",
    image: siteImages.spaghettini,
  },
  {
    title: "Newport Beach Jazz Festival",
    city: "Newport Beach, CA",
    date: "May 30, 2026",
    time: "Festival Schedule",
    note: "Festival lawn seating and weekend programming",
    venue: "Hyatt Regency, 1107 Jamboree Rd, Newport Beach, CA",
    ticketUrl: "https://tickets.hyattconcerts.com/",
    mapUrl: "https://maps.apple.com/?q=1107+Jamboree+Rd+Newport+Beach+CA",
    image: siteImages.newport,
  },
];

const releases = [
  {
    title: "New Release Hub",
    description:
      "Keep fans listening in one place with streaming links, release notes, and audio previews.",
    url: siteLinks.audio,
    cta: "Open Audio",
  },
  {
    title: "Performance Videos",
    description:
      "Feature clips, interviews, tributes, and behind-the-scenes footage in a single video destination.",
    url: siteLinks.videos,
    cta: "Watch Videos",
  },
];

const merchItems = [
  {
    id: "flexfit-cap-black",
    name: "Durti-Ryce Nation - Limited Edition Structured Twill Cap",
    price: 35.0,
    description:
      "Limited edition structured twill cap with an athletic shape, curved visor, and stretch-band sizing from the live Durti-Ryce store.",
    badge: "Live store item",
    image: siteImages.merchCap,
    productUrl: "https://durtiryce.com/product/1228390-durti-ryce-nation-limited-edition-structured-twill-cap",
  },
  {
    id: "womens-vneck",
    name: "Durti-Ryce Nation - Limited Edition Women’s relaxed v-neck t-shirt",
    price: 35.0,
    description:
      "Soft relaxed-fit V-neck tee pulled directly from the current Durti-Ryce merch page.",
    badge: "Live store item",
    image: siteImages.merchShirt,
    productUrl:
      "https://durtiryce.com/product/1228840-durti-ryce-nation-limited-edition-women-s-relaxed-v-neck-t-shirt",
  },
  {
    id: "glossy-mug",
    name: "Black Glossy Mug",
    price: 23.49,
    description:
      "Glossy ceramic mug available now from the live merch catalog.",
    badge: "Live store item",
    image: siteImages.merchMug,
    productUrl: "https://durtiryce.com/product/1120431-black-glossy-mug",
  },
  {
    id: "organic-hoodie",
    name: "Unisex Organic Relaxed Hoodie",
    price: 40.34,
    description:
      "Eco-friendly relaxed hoodie featured on the current Durti-Ryce merch page.",
    badge: "Live store item",
    image: siteImages.merchHoodie,
    productUrl: "https://durtiryce.com/product/1119888-unisex-organic-relaxed-hoodie",
  },
];

const fanClubTiers = [
  {
    name: "Bronze",
    description: "Entry-level access to Durti-Ryce Nation updates and member announcements.",
    url: siteLinks.bronze,
  },
  {
    name: "Silver",
    description: "Priority fan access with stronger perks and future presale opportunities.",
    url: siteLinks.silver,
  },
  {
    name: "Gold",
    description: "Premium fan club tier for exclusive experiences and special content drops.",
    url: siteLinks.gold,
  },
  {
    name: "Platinum",
    description: "Top-tier access designed for VIP supporters and high-touch fan experiences.",
    url: siteLinks.platinum,
  },
];

const artistProfiles = [
  {
    name: "Deron",
    role: "Lead artist and fan connection anchor",
    bio: "Feature Deron as the central voice of the app experience, tying together live shows, fan club access, and direct audience connection.",
    image: deronProfile,
    primaryLabel: "Band Instagram",
    primaryUrl: "https://www.instagram.com/durtiryce/",
    secondaryLabel: "Ask Deron",
    secondaryUrl: siteLinks.askDeron,
  },
  {
    name: "Hunter Lane",
    role: "Featured artist profile",
    bio: "Use this section to spotlight Hunter Lane's presence in the project, share artist notes, and route fans to social content.",
    image: hunterLaneProfile,
    primaryLabel: "Instagram",
    primaryUrl: "https://www.instagram.com/robertmusic89/",
    secondaryLabel: "Videos",
    secondaryUrl: siteLinks.videos,
  },
  {
    name: "Monique Renée",
    role: "Featured artist profile",
    bio: "Highlight Monique Renée with artist storytelling, show appearances, and a fast path to social updates and fan engagement.",
    image: moniqueReneeProfile,
    primaryLabel: "Instagram",
    primaryUrl: "https://www.instagram.com/uniquemojo/",
    secondaryLabel: "Videos",
    secondaryUrl: siteLinks.videos,
  },
];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
    </View>
  );
}

function Card({ children, accent }) {
  return (
    <View style={[styles.card, accent ? styles.cardAccent : undefined]}>
      {children}
    </View>
  );
}

function ActionButton({ label, onPress, secondary }) {
  return (
    <Pressable
      style={[styles.button, secondary ? styles.secondaryButton : undefined]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          secondary ? styles.secondaryButtonText : undefined,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function InfoPill({ label }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [cart, setCart] = useState({});

  const nextShow = useMemo(() => shows[0], []);

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert("Link unavailable", "This link could not be opened right now.");
      return;
    }

    await Linking.openURL(url);
  };

  const addToCart = (item) => {
    setCart((currentCart) => ({
      ...currentCart,
      [item.id]: (currentCart[item.id] ?? 0) + 1,
    }));
  };

  const updateCartItem = (itemId, delta) => {
    setCart((currentCart) => {
      const nextQuantity = (currentCart[itemId] ?? 0) + delta;

      if (nextQuantity <= 0) {
        const { [itemId]: _removed, ...rest } = currentCart;
        return rest;
      }

      return {
        ...currentCart,
        [itemId]: nextQuantity,
      };
    });
  };

  const cartItems = merchItems
    .filter((item) => cart[item.id] > 0)
    .map((item) => ({
      ...item,
      quantity: cart[item.id],
      lineTotal: cart[item.id] * item.price,
    }));

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const placeOrder = () => {
    if (cartCount === 0) {
      Alert.alert("Cart is empty", "Add at least one merch item before checking out.");
      return;
    }

    Alert.alert(
      "Continue to checkout",
      `Your cart has ${cartCount} item${cartCount === 1 ? "" : "s"} totaling $${cartTotal}. The next step will open the live Durti-Ryce merch store for final checkout.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Open Store",
          onPress: () => {
            setCart({});
            openLink(siteLinks.merch);
          },
        },
      ],
    );
  };

  const submitNewsletter = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Almost there", "Please add your name and email to join the newsletter.");
      return;
    }

    Alert.alert(
      "Thanks for joining",
      `${name.trim()}, your info has been captured for the Durti-Ryce Fan Connect MVP. Next we can wire this form to a real email platform.`,
    );

    setName("");
    setEmail("");
    setCity("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.appFrame}>
        <View style={styles.tabRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabRowInner}>
              {tabs.map((tab) => (
                <Pressable
                  key={tab}
                  style={[
                    styles.tab,
                    activeTab === tab ? styles.activeTab : undefined,
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab ? styles.activeTabText : undefined,
                    ]}
                  >
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {activeTab === "Home" && (
            <View style={styles.section}>
              <View style={styles.heroCard}>
                <Image
                  source={{ uri: siteImages.hero }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
                <Text style={styles.bandName}>Durti-Ryce Fan Connect</Text>
                <Text style={styles.tagline}>
                  One home for the fan experience, built around shows, tickets,
                  music, merch, and direct connection.
                </Text>
                <View style={styles.heroPills}>
                  <InfoPill label="Mobile first" />
                  <InfoPill label="Fast fan actions" />
                  <InfoPill label="Accessible" />
                </View>
                <View style={styles.heroActions}>
                  <ActionButton
                    label="Buy Tickets"
                    onPress={() => openLink(nextShow.ticketUrl)}
                  />
                  <ActionButton
                    label="Join Fan Club"
                    onPress={() => openLink(siteLinks.fanClub)}
                    secondary
                  />
                </View>
              </View>

              <Card accent>
                <Image
                  source={{ uri: nextShow.image }}
                  style={styles.featureImage}
                  resizeMode="cover"
                />
                <Text style={styles.cardEyebrow}>Next Show</Text>
                <Text style={styles.cardTitle}>{nextShow.title}</Text>
                <Text style={styles.cardBody}>
                  {nextShow.date} • {nextShow.time} • {nextShow.city}
                </Text>
                <Text style={styles.supportText}>{nextShow.venue}</Text>
                <View style={styles.inlineActions}>
                  <ActionButton
                    label="Tickets"
                    onPress={() => openLink(nextShow.ticketUrl)}
                  />
                  <ActionButton
                    label="Directions"
                    onPress={() => openLink(nextShow.mapUrl)}
                    secondary
                  />
                </View>
              </Card>

              <Card>
                <Image
                  source={{ uri: siteImages.newport }}
                  style={styles.featureImage}
                  resizeMode="cover"
                />
                <Text style={styles.cardEyebrow}>Latest Release</Text>
                <Text style={styles.cardTitle}>Stream the newest music</Text>
                <Text style={styles.cardBody}>
                  Bring the latest release, audio previews, and video content into
                  one music destination for fans.
                </Text>
                <ActionButton
                  label="Open Music Hub"
                  onPress={() => openLink(siteLinks.audio)}
                />
              </Card>

              <Card>
                <Image
                  source={{ uri: siteImages.merch }}
                  style={styles.featureImage}
                  resizeMode="cover"
                />
                <Text style={styles.cardEyebrow}>Featured Merch</Text>
                <Text style={styles.cardTitle}>Limited edition drops</Text>
                <Text style={styles.cardBody}>
                  Create urgency around new apparel, collectibles, and show-night
                  merch with quick shopping links.
                </Text>
                <ActionButton
                  label="Shop Merch"
                  onPress={() => openLink(siteLinks.merch)}
                />
              </Card>

              <Card>
                <Text style={styles.cardEyebrow}>Newsletter</Text>
                <Text style={styles.cardTitle}>Stay close to the music</Text>
                <Text style={styles.cardBody}>
                  Capture fan name, email, and city so updates can be personalized
                  around tour stops and exclusive drops.
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Name"
                  placeholderTextColor="#8b819c"
                  style={styles.input}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#8b819c"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="City"
                  placeholderTextColor="#8b819c"
                  style={styles.input}
                />
                <ActionButton label="Join Newsletter" onPress={submitNewsletter} />
              </Card>
            </View>
          )}

          {activeTab === "Shows" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="Tour Dates"
                title="Find the next show fast"
                description="Ticket buying should be a one- or two-tap experience with venue details, directions, and VIP messaging close by."
              />
              {shows.map((show) => (
                <Card key={`${show.title}-${show.date}`}>
                  <Image
                    source={{ uri: show.image }}
                    style={styles.featureImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.cardTitle}>{show.title}</Text>
                  <Text style={styles.cardBody}>
                    {show.date} • {show.time}
                  </Text>
                  <Text style={styles.supportText}>{show.city}</Text>
                  <Text style={styles.supportText}>{show.venue}</Text>
                  <Text style={styles.noteText}>{show.note}</Text>
                  <View style={styles.inlineActions}>
                    <ActionButton
                      label="Buy Tickets"
                      onPress={() => openLink(show.ticketUrl)}
                    />
                    <ActionButton
                      label="Map"
                      onPress={() => openLink(show.mapUrl)}
                      secondary
                    />
                  </View>
                </Card>
              ))}
            </View>
          )}

          {activeTab === "Music" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="New Releases"
                title="Keep music and video together"
                description="This section is set up for streaming links, release notes, performance clips, and artist storytelling."
              />
              {releases.map((item) => (
                <Card key={item.title}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardBody}>{item.description}</Text>
                  <ActionButton
                    label={item.cta}
                    onPress={() => openLink(item.url)}
                  />
                </Card>
              ))}
            </View>
          )}

          {activeTab === "Merch" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="Merchandise"
                title="Promote the products that move"
                description="Use featured cards for limited drops, bundles, VIP add-ons, and tour-specific merch moments."
              />
              {merchItems.map((item) => (
                <Card key={item.name}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.featureImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardEyebrow}>{item.badge}</Text>
                  <Text style={styles.cardBody}>${item.price}</Text>
                  <Text style={styles.supportText}>{item.description}</Text>
                  <View style={styles.inlineActions}>
                    <ActionButton
                      label="Add to Cart"
                      onPress={() => addToCart(item)}
                    />
                    <ActionButton
                      label="View Details"
                      onPress={() => openLink(item.productUrl)}
                      secondary
                    />
                  </View>
                </Card>
              ))}
              <Card accent>
                <Text style={styles.cardTitle}>Cart</Text>
                <Text style={styles.cardBody}>
                  Review merch selections and simulate checkout inside the app.
                </Text>
                {cartItems.length === 0 && (
                  <Text style={styles.supportText}>
                    Your cart is empty right now. Add an item above to get started.
                  </Text>
                )}
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartRow}>
                    <View style={styles.cartCopy}>
                      <Text style={styles.cartTitle}>{item.name}</Text>
                      <Text style={styles.supportText}>
                        {item.quantity} x ${item.price} = ${item.lineTotal}
                      </Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <Pressable
                        style={styles.quantityButton}
                        onPress={() => updateCartItem(item.id, -1)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </Pressable>
                      <Text style={styles.quantityValue}>{item.quantity}</Text>
                      <Pressable
                        style={styles.quantityButton}
                        onPress={() => updateCartItem(item.id, 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
                <View style={styles.cartSummary}>
                  <Text style={styles.cartSummaryText}>Items: {cartCount}</Text>
                  <Text style={styles.cartSummaryText}>Total: ${cartTotal}</Text>
                </View>
                <View style={styles.inlineActions}>
                  <ActionButton label="Place Demo Order" onPress={placeOrder} />
                  <ActionButton
                    label="Open Live Store"
                    onPress={() => openLink(siteLinks.merch)}
                    secondary
                  />
                </View>
              </Card>
            </View>
          )}

          {activeTab === "Artists" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="Artist Profiles"
                title="Meet the featured artists"
                description="This tab gives fans a dedicated place to connect with Deron, Hunter Lane, and Monique Renée without hunting through other sections."
              />
              {artistProfiles.map((artist) => (
                <Card key={artist.name}>
                  <Image
                    source={
                      typeof artist.image === "string"
                        ? { uri: artist.image }
                        : artist.image
                    }
                    style={styles.featureImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.cardTitle}>{artist.name}</Text>
                  <Text style={styles.cardEyebrow}>{artist.role}</Text>
                  <Text style={styles.cardBody}>{artist.bio}</Text>
                  <View style={styles.inlineActions}>
                    <ActionButton
                      label={artist.primaryLabel}
                      onPress={() => openLink(artist.primaryUrl)}
                    />
                    <ActionButton
                      label={artist.secondaryLabel}
                      onPress={() => openLink(artist.secondaryUrl)}
                      secondary
                    />
                  </View>
                </Card>
              ))}
            </View>
          )}

          {activeTab === "Fan Club" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="Durti-Ryce Nation"
                title="Build loyalty with tiers and perks"
                description="This MVP points fans to membership tiers now and leaves room for future members-only content, VIP access, and rewards."
              />
              <Card accent>
                <Text style={styles.cardTitle}>Fan club landing page</Text>
                <Text style={styles.cardBody}>
                  Start with one clear path into the membership experience, then
                  layer in presales, contests, and member-only media later.
                </Text>
                <ActionButton
                  label="Open Fan Club"
                  onPress={() => openLink(siteLinks.fanClub)}
                />
              </Card>
              {fanClubTiers.map((tier) => (
                <Card key={tier.name}>
                  <Text style={styles.cardTitle}>{tier.name} Member</Text>
                  <Text style={styles.supportText}>{tier.description}</Text>
                  <ActionButton
                    label={`View ${tier.name}`}
                    onPress={() => openLink(tier.url)}
                  />
                </Card>
              ))}
            </View>
          )}

          {activeTab === "More" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="More"
                title="Reach every fan touchpoint"
                description="This area covers the newsletter, social hub, video, booking, and support so the app can grow without crowding the main navigation."
              />
              <Card>
                <Text style={styles.cardTitle}>Newsletter and fan data</Text>
                <Text style={styles.cardBody}>
                  In the next version, connect the signup form to a real email
                  platform and capture city-based fan demand.
                </Text>
                <ActionButton
                  label="Ask Deron"
                  onPress={() => openLink(siteLinks.askDeron)}
                />
              </Card>
              <Card>
                <Text style={styles.cardTitle}>Book the band</Text>
                <Text style={styles.cardBody}>
                  Keep booking inquiries one tap away for venues, festivals, and
                  private events.
                </Text>
                <ActionButton
                  label="Event Booking"
                  onPress={() => openLink(siteLinks.booking)}
                />
              </Card>
              <Card>
                <Text style={styles.cardTitle}>Social and content hub</Text>
                <Text style={styles.cardBody}>
                  Direct fans to the channels and media destinations that keep them
                  engaged between shows.
                </Text>
                <View style={styles.linkGrid}>
                  {socialLinks.map((item) => (
                    <Pressable
                      key={item.name}
                      style={styles.linkChip}
                      onPress={() => openLink(item.url)}
                    >
                      <Text style={styles.linkChipText}>{item.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </Card>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#120c12",
  },
  appFrame: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 40,
  },
  tabRow: {
    paddingTop: 6,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2b2028",
    backgroundColor: "#120c12",
  },
  tabRowInner: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 18,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#241720",
    borderWidth: 1,
    borderColor: "#3a2a34",
  },
  activeTab: {
    backgroundColor: "#df8d42",
    borderColor: "#df8d42",
  },
  tabText: {
    color: "#efe3d5",
    fontWeight: "700",
  },
  activeTabText: {
    color: "#1b0f0c",
  },
  section: {
    gap: 14,
  },
  heroCard: {
    borderRadius: 30,
    padding: 22,
    backgroundColor: "#241720",
    borderWidth: 1,
    borderColor: "#4c3340",
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 22,
    marginBottom: 18,
  },
  bandName: {
    color: "#f7eddf",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
  },
  tagline: {
    color: "#dcc9bc",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  heroPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 18,
  },
  heroActions: {
    gap: 10,
    marginTop: 18,
  },
  sectionHeader: {
    marginBottom: 6,
  },
  eyebrow: {
    color: "#df8d42",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#f7eddf",
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    marginBottom: 8,
  },
  sectionDescription: {
    color: "#dcc9bc",
    fontSize: 15,
    lineHeight: 23,
  },
  card: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: "#1b1118",
    borderWidth: 1,
    borderColor: "#3a2a34",
  },
  featureImage: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: "#241720",
  },
  cardAccent: {
    backgroundColor: "#2b1822",
    borderColor: "#7a4c45",
  },
  cardEyebrow: {
    color: "#df8d42",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardTitle: {
    color: "#f7eddf",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  cardBody: {
    color: "#e9d9cd",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  supportText: {
    color: "#cdb9ab",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  noteText: {
    color: "#b99c88",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#3a2430",
  },
  pillText: {
    color: "#f7eddf",
    fontSize: 13,
    fontWeight: "700",
  },
  button: {
    minHeight: 48,
    borderRadius: 999,
    backgroundColor: "#df8d42",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#6e5050",
  },
  buttonText: {
    color: "#1b0f0c",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButtonText: {
    color: "#f7eddf",
  },
  inlineActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  input: {
    borderRadius: 16,
    backgroundColor: "#271c24",
    borderWidth: 1,
    borderColor: "#3f2f3a",
    color: "#f7eddf",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#4b3640",
  },
  cartCopy: {
    flex: 1,
  },
  cartTitle: {
    color: "#f7eddf",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#df8d42",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#1b0f0c",
    fontSize: 18,
    fontWeight: "900",
  },
  quantityValue: {
    color: "#f7eddf",
    fontSize: 16,
    fontWeight: "800",
    minWidth: 20,
    textAlign: "center",
  },
  cartSummary: {
    borderTopWidth: 1,
    borderTopColor: "#4b3640",
    marginTop: 8,
    paddingTop: 14,
    marginBottom: 14,
    gap: 6,
  },
  cartSummaryText: {
    color: "#f7eddf",
    fontSize: 16,
    fontWeight: "800",
  },
  linkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  linkChip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#241720",
    borderWidth: 1,
    borderColor: "#3f2f3a",
  },
  linkChipText: {
    color: "#f7eddf",
    fontWeight: "700",
  },
});
