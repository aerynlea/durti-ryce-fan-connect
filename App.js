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
  merchShirtWhite:
    "https://files.cdn.printful.com/files/066/066fd0d78cbadf40025d0c31721d2866_preview.png",
  merchMug:
    "https://files.cdn.printful.com/files/148/148b4b99d982684814d9ffd5b1e61b2d_preview.png",
  merchHoodie:
    "https://files.cdn.printful.com/files/0d3/0d3cdcd8094820740c4654f4f083cad3_preview.png",
  merchHoodieWhite:
    "https://files.cdn.printful.com/files/b69/b69a865fba065548feee3260a19bf478_preview.png",
};

const socialLinks = [
  { name: "Website", url: siteLinks.home },
  { name: "Band Instagram", url: "https://www.instagram.com/durtiryce/" },
  { name: "Videos", url: siteLinks.videos },
  { name: "Audio", url: siteLinks.audio },
  { name: "Hunter Lane IG", url: "https://www.instagram.com/hunterlane_music/" },
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
    ticketUrl: "https://www.ticketweb.com/search?q=durti-ryce",
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
    ticketUrl: "https://www.ticketweb.com/search?q=durti-ryce",
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
    ticketUrl: "https://www.tix.com/ticket-sales/ThorntonWinery/4672/event/1459462",
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
      "Stay connected to the sound. From fresh releases to signature renditions, experience the music that defines Durti-Ryce all in one place.",
    url: siteLinks.audio,
    cta: "Enter the Vibe",
  },
  {
    title: "Performance Videos",
    description:
      "Feel the energy of every performance. From crowd-favorite tributes to behind-the-scenes moments, this is where the stage comes alive.",
    url: siteLinks.videos,
    cta: "Watch the Experience",
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
    colors: ["White"],
    sizes: ["S/M", "L/XL"],
  },
  {
    id: "womens-vneck",
    name: "Durti-Ryce Nation - Limited Edition Women’s relaxed v-neck t-shirt",
    price: 35.0,
    description:
      "Soft relaxed-fit V-neck tee pulled directly from the current Durti-Ryce merch page.",
    badge: "Live store item",
    image: siteImages.merchShirt,
    imagesByColor: {
      "Solid Black Blend": siteImages.merchShirt,
      "Solid White Blend": siteImages.merchShirtWhite,
    },
    productUrl:
      "https://durtiryce.com/product/1228840-durti-ryce-nation-limited-edition-women-s-relaxed-v-neck-t-shirt",
    colors: ["Solid Black Blend", "Solid White Blend"],
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    imagesByColor: {
      Black: siteImages.merchHoodie,
      White: siteImages.merchHoodieWhite,
    },
    productUrl: "https://durtiryce.com/product/1119888-unisex-organic-relaxed-hoodie",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    bio: "Deron stands at the heart of the Durti-Ryce experience with a voice, presence, and charisma that anchor every performance. As a leading force behind the group’s connection to the audience, he helps turn each show into something personal, powerful, and unforgettable while carrying the spirit of soul into every room.",
    image: deronProfile,
    primaryLabel: "Band Instagram",
    primaryUrl: "https://www.instagram.com/durtiryce/",
    secondaryLabel: "Ask Deron",
    secondaryUrl: siteLinks.askDeron,
  },
  {
    name: "Hunter Lane",
    role: "Lead background vocalist and rising artist",
    bio: "Hunter Lane brings fresh energy, vocal depth, and an undeniable presence to the Durti-Ryce experience. As the lead background vocalist and an up-and-coming artist in his own right, he helps shape the sound behind every performance while building a style that feels modern, soulful, and full of promise.",
    image: hunterLaneProfile,
    primaryLabel: "Instagram",
    primaryUrl: "https://www.instagram.com/hunterlane_music/",
    secondaryLabel: "Videos",
    secondaryUrl: siteLinks.videos,
  },
  {
    name: "Monique Renée",
    role: "Featured vocalist with timeless soul",
    bio: "Monique Renée brings the soul of Teena Marie and the kind of stage presence that leaves a lasting impression every single show. Her performances are rich, expressive, and sensational bringing elegance, power, and deep feeling to the Durti-Ryce sound.",
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
  const [selectedColors, setSelectedColors] = useState(() =>
    Object.fromEntries(
      merchItems
        .filter((item) => item.colors?.length)
        .map((item) => [item.id, item.colors[0]]),
    ),
  );
  const [selectedSizes, setSelectedSizes] = useState(() =>
    Object.fromEntries(
      merchItems
        .filter((item) => item.sizes?.length)
        .map((item) => [item.id, item.sizes[0]]),
    ),
  );

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
    const chosenColor = selectedColors[item.id];
    const chosenSize = selectedSizes[item.id];
    const cartKey = [item.id, chosenColor, chosenSize].filter(Boolean).join(":");

    setCart((currentCart) => ({
      ...currentCart,
      [cartKey]: (currentCart[cartKey] ?? 0) + 1,
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

  const cartItems = Object.entries(cart)
    .map(([cartKey, quantity]) => {
      const [itemId, selectedColor, selectedSize] = cartKey.split(":");
      const item = merchItems.find((entry) => entry.id === itemId);

      if (!item) {
        return null;
      }

      return {
        ...item,
        cartKey,
        selectedColor,
        selectedSize,
        quantity,
        lineTotal: quantity * item.price,
      };
    })
    .filter(Boolean);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const checkoutOnStore = () => {
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

  const getMerchImage = (item) => {
    const selectedColor = selectedColors[item.id];
    return item.imagesByColor?.[selectedColor] ?? item.image;
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
                  Durti-Ryce is a Los Angeles-based R&B collective known for
                  high-energy live performances, soulful precision, and a stage
                  presence that turns every show into an experience. Featuring
                  powerhouse vocalist Deron, the group honors the
                  timeless spirit of classic R&B while building modern spaces
                  for connection, celebration, and nostalgia through
                  Durti-Ryce Nation.
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
                title="Be There When the Music Moves"
                description="Explore upcoming performances, secure your place, and stay close to the moments where Durti-Ryce comes fully alive on stage."
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
                title="Where Soul Meets the Stage"
                description="Step into the sound of Durti-Ryce live performances, timeless R&B energy, and moments that bring the music to life beyond the stage."
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
                title="Wear the Experience"
                description="Step into the world of Durti-Ryce through signature pieces, fan favorites, and limited-edition items designed to keep the music with you beyond the stage."
              />
              {merchItems.map((item) => (
                <Card key={item.name}>
                  <Image
                    source={{ uri: getMerchImage(item) }}
                    style={styles.featureImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardEyebrow}>{item.badge}</Text>
                  <Text style={styles.cardBody}>${item.price}</Text>
                  <Text style={styles.supportText}>{item.description}</Text>
                  {item.colors?.length ? (
                    <View style={styles.optionBlock}>
                      <Text style={styles.optionLabel}>Color</Text>
                      <View style={styles.optionChips}>
                        {item.colors.map((color) => (
                          <Pressable
                            key={color}
                            style={[
                              styles.optionChip,
                              selectedColors[item.id] === color
                                ? styles.optionChipActive
                                : undefined,
                            ]}
                            onPress={() =>
                              setSelectedColors((current) => ({
                                ...current,
                                [item.id]: color,
                              }))
                            }
                          >
                            <Text
                              style={[
                                styles.optionChipText,
                                selectedColors[item.id] === color
                                  ? styles.optionChipTextActive
                                  : undefined,
                              ]}
                            >
                              {color}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {item.sizes?.length ? (
                    <View style={styles.optionBlock}>
                      <Text style={styles.optionLabel}>Size</Text>
                      <View style={styles.optionChips}>
                        {item.sizes.map((size) => (
                          <Pressable
                            key={size}
                            style={[
                              styles.optionChip,
                              selectedSizes[item.id] === size
                                ? styles.optionChipActive
                                : undefined,
                            ]}
                            onPress={() =>
                              setSelectedSizes((current) => ({
                                ...current,
                                [item.id]: size,
                              }))
                            }
                          >
                            <Text
                              style={[
                                styles.optionChipText,
                                selectedSizes[item.id] === size
                                  ? styles.optionChipTextActive
                                  : undefined,
                              ]}
                            >
                              {size}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  ) : null}
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
                <Text style={styles.cartEyebrow}>Ready to buy?</Text>
                <Text style={styles.cardTitle}>Cart</Text>
                <Text style={styles.cardBody}>
                  Review merch selections, then continue to the live store checkout.
                </Text>
                {cartItems.length === 0 && (
                  <Text style={styles.supportText}>
                    Your cart is empty right now. Add an item above to get started.
                  </Text>
                )}
                {cartItems.map((item) => (
                  <View key={item.cartKey} style={styles.cartRow}>
                    <View style={styles.cartCopy}>
                      <Text style={styles.cartTitle}>{item.name}</Text>
                      {item.selectedColor ? (
                        <Text style={styles.supportText}>
                          Color: {item.selectedColor}
                        </Text>
                      ) : null}
                      {item.selectedSize ? (
                        <Text style={styles.supportText}>
                          Size: {item.selectedSize}
                        </Text>
                      ) : null}
                      <Text style={styles.supportText}>
                        {item.quantity} x ${item.price} = ${item.lineTotal}
                      </Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <Pressable
                        style={styles.quantityButton}
                        onPress={() => updateCartItem(item.cartKey, -1)}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </Pressable>
                      <Text style={styles.quantityValue}>{item.quantity}</Text>
                      <Pressable
                        style={styles.quantityButton}
                        onPress={() => updateCartItem(item.cartKey, 1)}
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
                <View style={styles.checkoutWrap}>
                  <ActionButton
                    label="Continue to Store"
                    onPress={checkoutOnStore}
                  />
                </View>
              </Card>
            </View>
          )}

          {activeTab === "Artists" && (
            <View style={styles.section}>
              <SectionHeader
                eyebrow="Artist Profiles"
                title="Meet the Voices Behind the Experience"
                description="Discover the artists who shape the sound, energy, and spirit of Durti-Ryce from center-stage presence to unforgettable vocal moments."
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
                title="Join the Inner Circle"
                description="Exclusive access, deeper connection, and fan experiences designed for the people who move with the music."
              />
              <Card accent>
                <Text style={styles.cardTitle}>Durti-Ryce Nation</Text>
                <Text style={styles.cardBody}>
                  Step into the official fan community for priority access,
                  exclusive updates, special experiences, and a deeper
                  connection to the world of Durti-Ryce.
                </Text>
                <ActionButton
                  label="Enter Fan Club"
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
                title="Go Deeper Into the Experience"
                description="From booking and direct updates to social connection and behind-the-scenes access, this is where the wider world of Durti-Ryce opens up."
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
  optionBlock: {
    marginBottom: 12,
  },
  optionLabel: {
    color: "#f7c98d",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  optionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#6e5050",
    backgroundColor: "#241720",
  },
  optionChipActive: {
    backgroundColor: "#df8d42",
    borderColor: "#df8d42",
  },
  optionChipText: {
    color: "#f7eddf",
    fontWeight: "700",
  },
  optionChipTextActive: {
    color: "#1b0f0c",
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
  cartEyebrow: {
    color: "#f7c98d",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
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
  checkoutWrap: {
    marginTop: 4,
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
