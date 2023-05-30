//Variables
var iconFirst = document.getElementById("checkIcon1")
var iconSecondary = document.getElementById("checkIcon2")
let kapatma = document.getElementById("kapat");
var gear = document.getElementById("gear");
var sahifeDiv = document.querySelector(".sayfa");
let bitir = document.getElementById("bitir");
let resetle = document.getElementById("resetle");
let pasQ = document.getElementById("pasQ")
var wordEl = document.getElementById("word");
var forbiddenEl = document.getElementById("forbidden");
var newCardEl = document.getElementById("newCard");
var tabuEl = document.getElementById("tabu");
var passEl = document.getElementById("pass");
var team1ScoreEl = document.getElementById("team1Score");
var team2ScoreEl = document.getElementById("team2Score");
var timerEl = document.getElementById("timer");
var passTurnBtn = document.getElementById("pass-turn-btn");
var cBox = document.getElementById("checkBox")
var soruIsareti = document.getElementById("fa-question")
var infoRemove = document.getElementById("infoRemoveIcon")
var tanitim = document.getElementById("oyunTanitimi")
var release = document.getElementById("btn-release");
var releaseNote = document.getElementById("releaseNotes");
var rlsIcon = document.getElementById("rlsIcon")

// Display = None
iconFirst.style.display = "none";
iconSecondary.style.display = "none";
releaseNote.style.display = "none";
sahifeDiv.style.display = "none";
tanitim.style.display = "none"; // Başlangıçta tanitim divini gizli yap

//Events
kapatma.addEventListener("click", kapatmaIslemi);
bitir.addEventListener("click", stop);
resetle.addEventListener("click", sifirla)
pasQ.addEventListener("click", pasCevap)



infoRemove.addEventListener("click", function () {
    tanitim.style.display = "none"
})
function kapatmaIslemi(e) {
    sahifeDiv.style.display = "none";
}
function showIconForTeam(teamNumber) {
    if (teamNumber === 1) {
        iconFirst.style.display = "inline-block";
        iconSecondary.style.display = "none";
    } else {
        iconFirst.style.display = "none";
        iconSecondary.style.display = "inline-block";
    }
}
function stop(e) {
    clearInterval(timer);
    newCardEl.disabled = true;
    tabuEl.disabled = true;
    passEl.disabled = true;
    passTurnBtn.style.display = "inline-block"; timeLeft = 0; // Süreyi sıfırla
    timerEl.innerHTML = timeLeft; // Timer göstergecisini sıfırla
}
function sifirla(e) {
    team1Score = 0; // Takım 1 puanını sıfırla
    team2Score = 0; // Takım 2 puanını sıfırla
    team1ScoreEl.innerHTML = team1Score; // Takım 1 puanını ekranda güncelle
    team2ScoreEl.innerHTML = team2Score; // Takım 2 puanını ekranda güncelle
}
let passButton = document.getElementById("pass");

function showPasCount() {
    let pasCount = sessionStorage.getItem("pas");
    if (pasCount === "00") {
        passButton.textContent = "Pas";
        passButton.disabled = false;
    } else {
        pasCount = parseInt(pasCount) || 0;
        passButton.textContent = "Pas: " + pasCount;
        passButton.disabled = pasCount <= 0; // Pas sayısı 0 ise butonu devre dışı bırak
    }
}
showPasCount();
passButton.addEventListener("click", function () {
    let pasCount = sessionStorage.getItem("pas");
    if (pasCount === "00") {
        showCard(); // 00 girildiğinde showCard() fonksiyonu çağrılır
        return;
    }
    pasCount = parseInt(pasCount) || 0;
    if (pasCount > 0) {
        pasCount--;
        sessionStorage.setItem("pas", pasCount);
        showPasCount();
        showCard();
    }
});

rlsIcon.addEventListener("click", function () {
    releaseNote.style.display = "none"
})

release.addEventListener("click", rlsNt)
function rlsNt(e) {
    releaseNote.style.display = "block"
}


gear.addEventListener("click", function () {
    sahifeDiv.style.display = "flex";
});
function pasCevap(e) {
    let sayfaInput = document.getElementById("sayfaInput");
    let icerik = sayfaInput.value.trim();
    
    if (icerik === "00") {
        sessionStorage.setItem("pas", "00");
    } else {
        let pasCount = parseInt(sessionStorage.getItem("pas")) || 0;
        pasCount = parseInt(icerik) || 0;
        sessionStorage.setItem("pas", pasCount);
    }
    sayfaInput.value = "";
    showPasCount();
}


function sifir() {
    sessionStorage.setItem("pas", "00");
}

// Kartlarımızı tanımlayalım
var cards = [
    {
        word: "Güneş",
        forbidden: ["Ay", "Yıldız", "Gece", "Sıcak"]
    },
    {
        word: "Yüzme",
        forbidden: ["Su", "Havuz", "Deniz", "Sahil"]
    },
    {
        word: "Kahve",
        forbidden: ["Çay", "Bardak", "Ev", "Anne"]
    },
    {
        word: "Beyin",
        forbidden: ["Kafa", "Baş", "Zeka", "Bilgi"]
    },
    {
        word: "Kitap",
        forbidden: ["Yazar", "Okuma", "Kütüphane", "Okul"]
    },
    { word: "Telefon", forbidden: ["Arama", "Mesaj", "Konuşma", "Oyun"] },
    { word: "Deniz", forbidden: ["Yüzme", "Dalga", "Balık", "Sahil"] },
    { word: "Bilgisayar", forbidden: ["Klavye", "Fare", "Ekran", "Bilişim"] },
    { word: "Şeker", forbidden: ["Tatlı", "Diyet", "Bayram", "Çay"] },
    { word: "Ay", forbidden: ["Gece", "Akşam", "Gökyüzü", "Astronomi"] },
    { word: "Kedi", forbidden: ["Köpek", "Sevimli", "Kuş", "Hayvan"] },
    { word: "Kalem", forbidden: ["Yazma", "Uç", "Defter", "Sınav"] },
    { word: "Uçak", forbidden: ["Havaalanı", "Uçmak", "Pilot", "Kule"] },
    { word: "Elma", forbidden: ["Meyve", "Yaz", "Sağlık", "Mutfak"] },
    { word: "Araba", forbidden: ["Sürmek", "Lastik", "Benzin", "Otomobil"] },
    { word: "Çiçek", forbidden: ["Bahar", "Gül", "Saksı", "Koklamak"] },
    { word: "Güneş", forbidden: ["Sıcak", "Yaz", "Gündüz", "Işık"] },
    { word: "Kitaplık", forbidden: ["Kapak", "Raf", "Kütüphane", "Okuma"] },
    { word: "Pasta", forbidden: ["Tatlı", "Krem", "Bayram", "Kalori"] },
    { word: "Bahar", forbidden: ["Çiçek", "Hava", "Doğa", "Mevsim"] },
    {
        word: "Film",
        forbidden: ["Sinema", "Oyuncu", "Yönetmen", "İzlemek"]
    },
    {
        word: "Dinozor",
        forbidden: ["Önce", "Nesli Tükenmiş", "Hayvan", "Jurassic Park"]
    },
    {
        word: "Şişe",
        forbidden: ["Cam", "Kola", "İçmek", "Su"]
    },
    {
        word: "Futbol",
        forbidden: ["Kale", "Top", "Saha", "Beden"]
    },
    {
        word: "Çikolata",
        forbidden: ["Tatlı", "Kakao", "Bitter", "Krem"]
    },

    {
        word: "Sürüngen",
        forbidden: ["Yılan", "Kertenkele", "Timsah", "Kaplumbağa"]
    },

    {
        word: "Yıldız",
        forbidden: ["Gökyüzü", "Parlaklık", "Gece", "Kutlama"]
    },

    {
        word: "Saat",
        forbidden: ["Zaman", "Kol", "Duvar", "Alarm"]
    },
    {
        word: "Kutu",
        forbidden: ["Ambalaj", "Hediye", "Kapak", "Koymak"]
    },
    {
        word: "Kuş",
        forbidden: ["Kanat", "Yumurta", "Uçmak", "Tüy"]
    },

    {
        word: "Puzzle",
        forbidden: ["Parça", "Birleştirmek", "Oyun", "Yap-boz"]
    },

    {
        word: "Bisiklet",
        forbidden: ["Tekerlek", "Pedal", "Vites", "Sürmek"]
    },

    {
        word: "Dünya",
        forbidden: ["Gezegen", "Güneş Sistemi", "Yaşam", "Mavi"]
    },

    {
        word: "Kamera",
        forbidden: ["Fotoğraf", "Video", "Çekmek", "Lens"]
    },

    {
        word: "Sincap",
        forbidden: ["Ağaç", "Fındık", "Kuyruk", "Kış Uykusu"]
    },

    {
        word: "Gitar",
        forbidden: ["Müzik", "Tel", "Çalmak", "Akustik"]
    },

    {
        word: "Teleskop",
        forbidden: ["Uzay", "Gözlem", "Yıldız", "Astronomi"]
    },

    {
        word: "Balık",
        forbidden: ["Deniz", "Akvaryum", "Yüzgeç", "Av"]
    },
    {
        word: "Beyzbol",
        forbidden: ["Top", "Vuruş", "Stadyum", "Amerika"]
    },

    {
        word: "Uzay",
        forbidden: ["Yıldız", "Gezegen", "Gökyüzü", "Roket"]
    },
    {
        word: "Çiçek",
        forbidden: ["Bahar", "Bahçe", "Koku", "Mevsim"]
    },
    {
        word: "Güvercin",
        forbidden: ["Kanat", "Yuva", "Uçmak", "Kuş"]
    },
    {
        word: "Radyo",
        forbidden: ["Müzik", "Dinlemek", "Frekans", "Eski"]
    },
    {
        word: "Pizza",
        forbidden: ["Peynir", "Hamur", "Sos", "Yuvarlak"]
    },
    {
        word: "Bulut",
        forbidden: ["Gökyüzü", "Yağmur", "Beyaz", "Şekil"]
    },
    {
        word: "Pilav",
        forbidden: ["Tavuk", "Baharat", "Tencere", "Nohut"]
    },

    {
        word: "Yelken",
        forbidden: ["Tekne", "Deniz", "Rüzgar", "Kumaş"]
    },

    {
        word: "Keman",
        forbidden: ["Müzik", "Telli", "Nota", "Çalmak"]
    },

    {
        word: "Kamp",
        forbidden: ["Çadır", "Doğa", "Ateş", "Toplanmak"]
    },

    {
        word: "Turist",
        forbidden: ["Yolculuk", "Rehber", "Fotoğraf", "Pasaport"]
    },

    {
        word: "Köprü",
        forbidden: ["Nehir", "Geçmek", "Yol", "Taş"]
    },

    {
        word: "Kuaför",
        forbidden: ["Saç kesimi", "Peruk", "Bakım", "Kadın"]
    },

    {
        word: "Zaman",
        forbidden: ["Saat", "Geçmiş", "Gelecek", "An"]
    },

    {
        word: "Patates",
        forbidden: ["Sebze", "Fırın", "Soğan", "Kızartma"]
    },

    {
        word: "Tiyatro",
        forbidden: ["Sahne", "Oyuncu", "Perde", "Kostüm"]
    },

    {
        word: "Meyve",
        forbidden: ["Tatlı", "Renkli", "Kabuklu", "Sebze"]
    },

    {
        word: "Orman",
        forbidden: ["Ağaç", "Yeşil", "Kamp", "Hayvan"]
    },
    {
        word: "Yürüyüş",
        forbidden: ["Park", "Spor", "Adım", "Koşu"]
    },
    {
        word: "Masa",
        forbidden: ["Sandalye", "Tabak", "Yemek", "Ofis"]
    },

    {
        word: "Sarımsak",
        forbidden: ["Baharat", "Kokmak", "Soğan", "Tuz"]
    },
    {
        word: "Okul",
        forbidden: ["Öğrenci", "Sınıf", "Ders", "Tatil"]
    },

    {
        word: "Balon",
        forbidden: ["Hava", "Şişmek", "Çocuk", "Patlamak"]
    },
    {
        word: "Kürk",
        forbidden: ["Hayvan", "Yün", "Mont", "Kıyafet"]
    },
    {
        word: "Sinema",
        forbidden: ["Film", "Patlamış Mısır", "Koltuk", "İzlemek"]
    },
    {
        word: "Şarkı",
        forbidden: ["Müzik", "Söylemek", "Nota", "Dans"]
    },
    {
        word: "Pilot",
        forbidden: ["Uçak", "Kokpit", "Yolcu", "Sürmek"]
    },
    {
        word: "Cüzdan",
        forbidden: ["Para", "Kredi kartı", "Kimlik", "Cep"]
    },
    {
        word: "Günebakan",
        forbidden: ["Çiçek", "Güneş", "Bahar", "Renkli"]
    },
    {
        word: "Ekmek",
        forbidden: ["Fırın", "Yemek", "Dilimlemek", "Un"]
    },
    {
        word: "Çiftlik",
        forbidden: ["Hayvan", "Tarla", "Süt", "Traktör"]
    },
    {
        word: "Fotoğraf",
        forbidden: ["Kamera", "Poz", "Portre", "Baskı"]
    },
    {
        word: "Gazete",
        forbidden: ["Haber", "Yazı", "Eski", "Abonelik"]
    },
    {
        word: "Mum",
        forbidden: ["Alev", "Koku", "Işık", "Elektrik"]
    },
    {
        word: "Tren",
        forbidden: ["Demiryolu", "Vagon", "Yolculuk", "Bilet"]
    },
    {
        word: "Bebek",
        forbidden: ["Emzik", "Beşik", "Kardeş", "Küçük"]
    },
    {
        word: "Düğün",
        forbidden: ["Gelinlik", "Damatlık", "Nikah", "Davetiye"]
    },
    {
        word: "Avukat",
        forbidden: ["Suç", "Mahkeme", "Dava", "Müvekkil"]
    },
    {
        word: "Yelkovan",
        forbidden: ["Saat", "Zaman", "Akrep", "Dakika"]
    },
    {
        word: "Balina",
        forbidden: ["Deniz", "Su", "Yunus", "Ağız"]
    },
    {
        word: "Caz",
        forbidden: ["Müzik", "Dans", "Enstrüman", "Klasik"]
    },
    {
        word: "Bardak",
        forbidden: ["Su", "Koymak", "Çay", "İçmek"]
    },
    {
        word: "Kamera",
        forbidden: ["Fotoğraf", "Çekmek", "Poz", "Lens"]
    },
    {
        word: "Aşçı",
        forbidden: ["Yemek", "Pişirmek", "Tencere", "Restoran"]
    },
    {
        word: "Meyve suyu",
        forbidden: ["Portakal", "Sıkma", "Vitamin", "İçmek"]
    },
    {
        word: "Günlük",
        forbidden: ["Yazmak", "Anı", "Defter", "Tarih"]
    },
    {
        word: "Tasarım",
        forbidden: ["Grafik", "Ürün", "Sanat", "Mimarlık"]
    },
    {
        word: "Pirinç",
        forbidden: ["Tatlı", "Yemek", "Sıcak", "Haşlama"]
    },
    {
        word: "Masa tenisi",
        forbidden: ["Top", "Raket", "Oyun", "Ping Pong"]
    },
    {
        word: "Çamaşır makinesi",
        forbidden: ["Yıkama", "Kirli", "Elbise", "Kıyafet"]
    },
    {
        word: "Ahşap",
        forbidden: ["Ağaç", "Doğal", "Mobilya", "Yangın"]
    },
    {
        word: "Sarhoş",
        forbidden: ["Alkol", "İçki", "Denge", "Kontrol"]
    },

    {
        word: "Gezegen",
        forbidden: ["Evren", "Uzay", "Dünya", "Astronomi"]
    },

    {
        word: "Basketbol",
        forbidden: ["Top", "Potası", "Oyun", "NBA"]
    },

    {
        word: "Bisiklet yarışı",
        forbidden: ["Tur", "Sürmek", "Pedal", "Tour de France"]
    },

    {
        word: "Koala",
        forbidden: ["Avustralya", "Ağaç", "Hayvan", "Eucalyptus"]
    },

    {
        word: "Çilek",
        forbidden: ["Meyve", "Tatlı", "Kırmızı", "Toprak"]
    },

    {
        word: "Teleskop",
        forbidden: ["Uzay", "Astronomi", "Gözlem", "Bakmak"]
    },

    {
        word: "Bebek arabası",
        forbidden: ["Çocuk", "Taşımak", "Yürüyüş", "Küçük"]
    },

    {
        word: "Ege denizi",
        forbidden: ["Marmara", "Tatil", "Yunanistan", "Mavi"]
    },

    {
        word: "Kask",
        forbidden: ["Baş", "Koruma", "Motosiklet", "Takmak"]
    },

    {
        word: "Yatak",
        forbidden: ["Uyku", "Yorgan", "Yastık", "Rahat"]
    },

    {
        word: "Mangal",
        forbidden: ["Barbekü", "Izgara", "Ateş", "Et"]
    },

    {
        word: "Kuş evi",
        forbidden: ["Yuva", "Kuş", "Koruma", "Doğa"]
    },

    {
        word: "Rüzgar",
        forbidden: ["Hava", "Fırtına", "Enerji", "Yelken"]
    },
    {
        word: "Hastane",
        forbidden: ["Doktor", "Hemşire", "Muayene", "Hasta"]
    },

    {
        word: "Buzdolabı",
        forbidden: ["Gıda", "Soğutmak", "Mutfak", "Açmak"]
    },

    {
        word: "Köprü",
        forbidden: ["Nehir", "Ulaşım", "Yaya", "İnşaat"]
    },

    {
        word: "Atletizm",
        forbidden: ["Koşu", "Zıplama", "Yarış", "Sporcu"]
    },

    {
        word: "Köpekbalığı",
        forbidden: ["Deniz", "Yunus", "Ağız", "Korku"]
    },

    {
        word: "Laptop",
        forbidden: ["Bilgisayar", "Ekran", "Klavye", "Pil"]
    },

    {
        word: "Sınav",
        forbidden: ["Okul", "Soru", "Not", "Stres"]
    },

    {
        word: "Avcı",
        forbidden: ["Silah", "Hayvan", "Köpek", "Orman"]
    },

    {
        word: "Süt",
        forbidden: ["İnek", "Kahvaltı", "Peynir", "İçmek"]
    },

    {
        word: "Yolculuk",
        forbidden: ["Tatil", "Ulaşım", "Valiz", "Turist"]
    },

    {
        word: "Ege",
        forbidden: ["Deniz", "Tatil", "Güneş", "Plaj"]
    },

    {
        word: "Klima",
        forbidden: ["Soğutmak", "Sıcak", "Enerji", "Kumanda"]
    },

    {
        word: "Bölüm",
        forbidden: ["Üniversite", "Ders", "Öğrenci", "Dizi"]
    },

    {
        word: "Hediye",
        forbidden: ["Sevgili", "Doğum günü", "Paket", "Açmak"]
    },

    {
        word: "Seyahat",
        forbidden: ["Tatil", "Ulaşım", "Turist", "Bavul"]
    },

    {
        word: "Terzi",
        forbidden: ["Dikiş", "Kumaş", "Giyim", "Elbise"]
    },

    {
        word: "Plaj",
        forbidden: ["Deniz", "Kum", "Güneş", "Havlu"]
    },

    {
        word: "Gözlük",
        forbidden: ["Göz", "Güneş", "Numara", "Çerçeve"]
    },
    {
        word: "Okyanus",
        forbidden: ["Deniz", "Kum", "Sahil", "Balık"]
    },

    {
        word: "Heykel",
        forbidden: ["Sanat", "Müze", "Taş", "Kil"]
    },

    {
        word: "Dağ",
        forbidden: ["Zirve", "Tırmanmak", "Kar", "Köy"]
    },
    {
        word: "Ağaç",
        forbidden: ["Orman", "Kesim", "Gövde", "Kök"]
    },
    { word: "Kalem", forbidden: ["Kağıt", "Silgi", "Defter", "Boya kalemi"] },
    { word: "Beyaz", forbidden: ["Siyah", "Renk", "Kar", "Geceleri"] },
    { word: "Uçak", forbidden: ["Havaalanı", "Pilot", "Yolcu", "Bilet"] },
    { word: "Sağlık", forbidden: ["Hastalık", "Doktor", "İlaç", "Ateş"] },
    { word: "Aile", forbidden: ["Ebeveyn", "Kardeş", "Akraba", "Kuşak"] },
    { word: "Kahve", forbidden: ["Çay", "Süt", "Fincan", "Telvesi"] },
    { word: "Kuş", forbidden: ["Uçmak", "Yuva", "Gökyüzü", "Kanat"] },
    { word: "Rüya", forbidden: ["Uyku", "Hayal", "Görmek", "Gerçek"] },
    { word: "Turist", forbidden: ["Gezi", "Yolculuk", "Rehber", "Müze"] },
    { word: "Buz", forbidden: ["Sıcaklık", "Erimek", "Kutu", "Buzdolabı"] },
    { word: "Güzel", forbidden: ["Çirkin", "Estetik", "Güzellik", "Harika"] },
    { word: "Gelecek", forbidden: ["Geçmiş", "Şimdiki zaman", "Tarih", "Öngörü"] },
    { word: "Kıyafet", forbidden: ["Giyim", "Moda", "Dikiş", "Tasarım"] },
    { word: "Ayna", forbidden: ["Yansıtma", "Görüntü", "Makyaj", "Banyo"] },
    { word: "Televizyon", forbidden: ["Program", "Kumanda", "Koltuk", "Ekran"] },
    { word: "Bulut", forbidden: ["Gökyüzü", "Yağmur", "Güneş", "Rüzgar"] },
    { word: "Çiçek", forbidden: ["Bahar", "Tohum", "Bahçe", "Aromatik"] },
    { word: "Spor", forbidden: ["Atletizm", "Futbol", "Basketbol", "Voleybol"] },
    { word: "Festival", forbidden: ["Eğlence", "Konser", "Müzik", "Kalabalık"] },
    { word: "Tatil", forbidden: ["Dinlenmek", "Gezi", "Deniz", "Yaz"] },
    { word: "Yemek", forbidden: ["Lezzet", "Tarif", "Pişirmek", "Restoran"] },
    { word: "Yol", forbidden: ["Kara", "Deniz", "Hava", "Rotası"] },
    { word: "Oyun", forbidden: ["Oyuncak", "Eğlence", "Strateji", "Kart"] },
    {
        word: "Yapay zeka",
        forbidden: ["Robot", "Makine öğrenimi", "İnsanlık dışı", "Yıkıcı"]
    },
    {
        word: "Yelken",
        forbidden: ["Rüzgar", "Deniz", "Tekne", "Motor"]
    },
    {
        word: "Şifre",
        forbidden: ["Açık metin", "Kod", "Şifre çözme", "Güvenli değil"]
    },
    {
        word: "Antik",
        forbidden: ["Eski", "Tarihi", "Modern", "Yeni"]
    },
    {
        word: "Köprü",
        forbidden: ["Nehir", "Trafik", "Yükseklik", "Otoyol"]
    },
    {
        word: "Rüya",
        forbidden: ["Gerçeklik", "Bilinç", "Uyku", "Hallüsinasyon"]
    },
    {
        word: "Bulaşık",
        forbidden: ["Yıkama", "Lavabo", "Mutfak", "Bardak"]
    },
    {
        word: "Fenerbahçe",
        forbidden: ["Galatasaray", "Beşiktaş", "Trabzonspor", "Futbol"]
    },

    {
        word: "Gitar",
        forbidden: ["Müzik", "Ses", "Çalmak", "Keman"]
    },
    {
        word: "Köpekbalığı",
        forbidden: ["Deniz", "Tehlike", "Yüzme", "Sevimli"]
    },

    {
        word: "Turşu",
        forbidden: ["Salatalık", "Sirke", "Yemek", "Tuzlu"]
    },
    {
        word: "Kale",
        forbidden: ["Gol", "Futbol", "Tarihi", "Kum"]
    },
    {
        word: "Kambur",
        forbidden: ["Omurga", "Hareket", "Duruş", "Oturmak"]
    },
    {
        word: "Sokak",
        forbidden: ["Ev", "Cadde", "Araç", "Oyun"]
    },
    {
        word: "Vampir",
        forbidden: ["Kan", "Sarımsak", "Gece", "Köylü"]
    },
    {
        word: "Ayna",
        forbidden: ["Yansıtma", "Yüz", "Bakmak", "Makyaj"]
    },
    {
        word: "Rüzgar",
        forbidden: ["Fırtına", "Soğuk", "Yağmur", "Esmek"]
    },
    {
        word: "Lale",
        forbidden: ["Çiçek", "Hollanda", "Bahar", "Ters"]
    },
    {
        word: "Kış",
        forbidden: ["Kar", "Soğuk", "Mevsim", "Yaz"]
    },];

//Soru işratetine tıklayınca açılan oyun tanıtma menüsü


soruIsareti.addEventListener("click", oyunAnlatimi);

function oyunAnlatimi(e) {
    tanitim.style.display = "block";
}

// Gereken değişkenleri tanımlayalım
var currentCard = 0;
var currentTeam = 1;
var team1Score = 0;
var team2Score = 0;
var timer;
// HTML öğelerini seçelim
currentTeam = 1;
// Oyunu başlatan fonksiyon
function startGame() {
    // Takım 1 başlayacak şekilde oyunu başlatalım
    function startTimer() {
        timer = setInterval(function () {
            if (timerEl.innerHTML == 0) {
                clearInterval(timer);
                return;
            } if (timerEl.innerHTML == 15) {
                var audio = document.getElementById("audio");
                audio.currentTime = 0;

                audio.play();
            }
            timerEl.innerHTML = parseInt(timerEl.innerHTML) - 1;
        }, 1000);
    } currentTeam = 1;
    showIconForTeam(currentTeam);
    // İlk kartı gösterelim
    showCard();
    // Timer'ı başlatalım
    startTimer();
    handleCheckboxChange(); // Checkbox durumunu kontrol et
}
// Yeni kart butonuna tıklanınca çalışacak fonksiyon
newCardEl.addEventListener("click", function () {
    // Puanı arttıralım
    incrementScore();
    // Yeni kartı gösterelim
    showCard();
});

// Tabu butonuna tıklanınca çalışacak fonksiyon
cBox.addEventListener("change", handleCheckboxChange);

tabuEl.addEventListener("click", tabuOldu)
var passTurnBtn = document.getElementById("pass-turn-btn");
var checkBox = document.getElementById("checkBox");

// Checkbox durumunu kontrol eden fonksiyon
function handleCheckboxChange() {
    if (checkBox.checked) {
        // Checkbox işaretli ise tabu butonuna basıldığında skorları azalt

        decrementScore();
    }


    else {
        // Checkbox işaretli değilse tabu butonuna basıldığında normal işlem devam etsin
        tabuEl.addEventListener("click", tabuOldu);
    }
}
function tabuOldu(e) {
    handleCheckboxChange(); // Checkbox durumunu kontrol et

    // Yeni kartı gösterelim
    showCard();
};


// Skoru azaltan fonksiyon
function decrementScore() {
    if (currentTeam === 1) {
        team1Score = Math.max(0, team1Score - 1); // Skor en düşük 0 olacak şekilde azaltılır
        team1ScoreEl.innerHTML = team1Score;
        iconFirst.style.display = "inline-block"; // Takım 1 için ikonu görünür yap
        iconSecondary.style.display = "none"; // Takım 2 için ikonu gizle
    } else {
        team2Score = Math.max(0, team2Score - 1); // Skor en düşük 0 olacak şekilde azaltılır
        team2ScoreEl.innerHTML = team2Score;
        iconFirst.style.display = "none"; // Takım 1 için ikonu gizle
        iconSecondary.style.display = "inline-block"; // Takım 2 için ikonu görünür yap
    }
}

// Puanı arttıran fonksiyon
function incrementScore() {
    if (currentTeam === 1) {
        team1Score++;
        team1ScoreEl.innerHTML = team1Score;
        iconFirst.style.display = "inline-block"; // Takım 1 için ikonu görünür yap
        iconSecondary.style.display = "none"; // Takım 2 için ikonu gizle
    } else {
        team2Score++;
        team2ScoreEl.innerHTML = team2Score;
        iconFirst.style.display = "none"; // Takım 1 için ikonu gizle
        iconSecondary.style.display = "inline-block"; // Takım 2 için ikonu görünür yap
    }
}



// Kartı gösteren fonksiyon
function showCard() {
    // Rastgele bir kart seçelim
    currentCard = Math.floor(Math.random() * cards.length);
    // Kelimeyi gösterelim
    wordEl.innerHTML = cards[currentCard].word;
    // Yasaklı kelimeleri gösterelim
    forbiddenEl.innerHTML = "";
    for (var i = 0; i < cards[currentCard].forbidden.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = cards[currentCard].forbidden[i];
        forbiddenEl.appendChild(li);
    }
}
// Takım puanlarını göster
team1ScoreEl.innerHTML = team1Score;
team2ScoreEl.innerHTML = team2Score;
// Timer'ı başlatan fonksiyon
function startTimer(duration, display) {
    var count = duration;
    var interval = setInterval(function () {
        count--;
        display.textContent = count;
        if (count === 0) {
            clearInterval(interval);
            // Sıradaki takıma geçelim
            currentTeam = currentTeam === 1 ? 2 : 1;
            // Yeni kartı gösterelim
            showCard();
            // Timer'ı tekrar başlatalım
            startTimer(duration, display);
        }
    }, 1000);
    if (count < 0) {
        clearInterval(interval);
        display.textContent = "Time's up!";
        // Takımı değiştir
        currentTeam = currentTeam === 1 ? 2 : 1;
        teamDisplayEl.textContent = "Team " + currentTeam;
        // Yeni takımın zamanını başlat
        setTimeout(() => {
            startTimer(seconds, timerDisplayEl);
        }, 1000);
    }
}
// Oyunu başlat
startGame();
const circleTimerEl = document.querySelector(".circle-timer .progress");
const seconds = 60;
// Timer'ı başlatan fonksiyon
function startTimer() {
    var timeLeft = 60;
    timerEl.innerHTML = timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        timerEl.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            newCardEl.disabled = true;
            tabuEl.disabled = true;
            passEl.disabled = true;
            passTurnBtn.style.display = "inline-block";
        } else {
            newCardEl.disabled = false;
            tabuEl.disabled = false;
            passEl.disabled = false;
        }
    }, 1000);
}
// Pas verip takım değiştirmeyi sağlayan butonuna tıklanınca çalışacak fonksiyon
passTurnBtn.addEventListener("click", function () {
    // Reset the timer and start it again
    clearInterval(timer);
    var timerBar = document.querySelector(".timer-bar-progress");
    timerBar.classList.remove("timer-bar-progress");
    void timerBar.offsetWidth;
    timerBar.classList.add("timer-bar-progress");
    timerEl.innerHTML = "60";
    timerEl.innerHTML = 60;
    startTimer();
    // Takım değiştir
    currentTeam = currentTeam === 1 ? 2 : 1;
    showIconForTeam(currentTeam);
    // Takım puanlarını güncelle
    team1ScoreEl.innerHTML = team1Score;
    team2ScoreEl.innerHTML = team2Score;
    // Toggle the button visibility
    passTurnBtn.style.display = "none";
    passEl.style.display = "block";
    showCard();
});
startTimer(seconds, document.getElementById("timer"));
var passTurnBtn = document.getElementById("pass-turn-btn");