# 🏠 SMARTNEST - Akıllı Ev IoT Projesi

SMARTNEST, NodeMCU tabanlı bir IoT akıllı ev sistemidir. Bu proje, sensörlerden veri toplamak, MongoDB'de saklamak ve web arayüzü üzerinden kontrol etmek için Node.js backend kullanır.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Proje Yapısı](#-proje-yapısı)
- [Kullanılan Teknolojiler](#-kullanılan-teknolojiler)
- [Donanım Gereksinimleri](#-donanım-gereksinimleri)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [API Endpointleri](#-api-endpointleri)
- [NodeMCU Kurulumu](#-nodemcu-kurulumu)
- [Web Dashboard](#-web-dashboard)
- [Kullanım](#-kullanım)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

- 🌡️ **Gerçek Zamanlı Sensör İzleme**: Sıcaklık, nem, hareket ve diğer sensör verilerini anlık takip
- 📊 **Veri Kaydetme**: MongoDB ile tüm sensör verilerini kaydetme ve geçmişe dönük analiz
- 🔌 **WiFi Bağlantısı**: NodeMCU'nun WiFi üzerinden internet bağlantısı
- 🌐 **RESTful API**: Node.js ile oluşturulmuş kapsamlı API
- 📱 **Responsive Web Dashboard**: Tüm cihazlarda çalışan modern web arayüzü
- 🔄 **Otomatik Güncelleme**: Sensör verilerinin otomatik olarak güncellenmesi
- 🔐 **Güvenli Bağlantı**: HTTP istekleri ile güvenli veri iletimi
- 📈 **Veri Görselleştirme**: Grafik ve tablolarla veri analizi

## 📁 Proje Yapısı

```
SMARTNEST/
├── server/
│   ├── index.js              # Ana sunucu dosyası
│   ├── config/
│   │   └── database.js       # MongoDB bağlantı yapılandırması
│   ├── models/
│   │   ├── sensor.js         # Sensör veri modeli
│   │   └── device.js         # Cihaz modeli
│   ├── routes/
│   │   ├── api.js            # API rotaları
│   │   └── sensors.js        # Sensör rotaları
│   ├── controllers/
│   │   ├── sensorController.js
│   │   └── deviceController.js
│   └── middleware/
│       └── auth.js           # Kimlik doğrulama middleware
├── client/
│   ├── index.html            # Ana sayfa
│   ├── css/
│   │   └── style.css         # Stil dosyası
│   ├── js/
│   │   ├── app.js            # Ana uygulama
│   │   └── charts.js         # Grafik işlemleri
│   └── assets/
│       └── images/
├── nodemcu/
│   ├── main.ino              # NodeMCU ana kod
│   ├── config.h              # WiFi ve server yapılandırması
│   └── sensors.h             # Sensör fonksiyonları
├── package.json
├── .env.example
└── README.md
```

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Node.js** (v14+): JavaScript runtime ortamı
- **Express.js**: Web framework
- **MongoDB**: NoSQL veritabanı
- **Mongoose**: MongoDB ODM
- **dotenv**: Ortam değişkenleri yönetimi
- **cors**: Cross-origin resource sharing
- **body-parser**: HTTP istek body parse

### Frontend
- **HTML5 & CSS3**: Modern web standartları
- **JavaScript (ES6+)**: İstemci tarafı programlama
- **Chart.js**: Veri görselleştirme
- **Bootstrap**: Responsive tasarım framework

### IoT/Donanım
- **NodeMCU ESP8266**: WiFi mikrodenetleyici
- **Arduino IDE**: Firmware geliştirme ortamı
- **DHT11/DHT22**: Sıcaklık ve nem sensörü
- **PIR Sensor**: Hareket sensörü
- **LED & Röle**: Çıkış kontrol elemanları

## 🔧 Donanım Gereksinimleri

### Zorunlu Bileşenler
- 1x NodeMCU ESP8266 / ESP32
- 1x DHT11 veya DHT22 sıcaklık-nem sensörü
- 1x PIR hareket sensörü
- 1x LED (test için)
- Breadboard ve jumper kablolar
- Micro USB kablosu

### Opsiyonel Bileşenler
- Röle modülü (elektrikli cihaz kontrolü için)
- LDR (ışık sensörü)
- MQ-2 (gaz sensörü)
- Buzzer
- OLED Display (0.96")

### Pin Bağlantıları

```
NodeMCU ESP8266 Pin Diyagramı:
━━━━━━━━━━━━━━━━━━━━━━━━
DHT11/DHT22  →  D4 (GPIO2)
PIR Sensor   →  D5 (GPIO14)
LED          →  D6 (GPIO12)
Röle         →  D7 (GPIO13)
```

## 📥 Kurulum

### 1. Repoyu Klonlayın

```bash
git clone https://github.com/TroubledKezoo1/SMARTNEST.git
cd SMARTNEST
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. MongoDB'yi Kurun ve Başlatın

**Windows:**
```bash
# MongoDB'yi indirin: https://www.mongodb.com/try/download/community
# Servisi başlatın
net start MongoDB
```

**Linux/Mac:**
```bash
# MongoDB'yi kurun
sudo apt-get install mongodb  # Ubuntu/Debian
brew install mongodb-community  # MacOS

# Servisi başlatın
sudo systemctl start mongodb
```

### 4. Ortam Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın ve düzenleyin:

```bash
cp .env.example .env
```

`.env` dosyası içeriği:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/smartnest
MONGODB_TEST_URI=mongodb://localhost:27017/smartnest_test

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# NodeMCU Configuration
DEVICE_API_KEY=your_device_api_key_here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 5. Sunucuyu Başlatın

**Geliştirme Modu:**
```bash
npm run dev
```

**Üretim Modu:**
```bash
npm start
```

Sunucu şu adreste çalışacaktır: `http://localhost:3000`

## ⚙️ Yapılandırma

### MongoDB Bağlantısı (`config/database.js`)

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Sensör Veri Modeli (`models/sensor.js`)

```javascript
const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    index: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  motion: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
```

## 🔌 API Endpointleri

### Sensör Verileri

#### Veri Gönderme (POST)
```http
POST /api/sensors/data
Content-Type: application/json

{
  "deviceId": "NODEMCU_001",
  "temperature": 24.5,
  "humidity": 60.2,
  "motion": false
}
```

**Yanıt:**
```json
{
  "success": true,
  "message": "Veri başarıyla kaydedildi",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "deviceId": "NODEMCU_001",
    "temperature": 24.5,
    "humidity": 60.2,
    "motion": false,
    "timestamp": "2026-01-05T12:11:08.000Z"
  }
}
```

#### Son Verileri Alma (GET)
```http
GET /api/sensors/latest?deviceId=NODEMCU_001
```

**Yanıt:**
```json
{
  "success": true,
  "data": {
    "deviceId": "NODEMCU_001",
    "temperature": 24.5,
    "humidity": 60.2,
    "motion": false,
    "timestamp": "2026-01-05T12:11:08.000Z"
  }
}
```

#### Geçmiş Verileri Alma (GET)
```http
GET /api/sensors/history?deviceId=NODEMCU_001&limit=100&startDate=2026-01-01
```

**Yanıt:**
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "temperature": 24.5,
      "humidity": 60.2,
      "motion": false,
      "timestamp": "2026-01-05T12:11:08.000Z"
    }
  ]
}
```

### Cihaz Kontrolü

#### Cihaz Durumunu Güncelleme (PUT)
```http
PUT /api/devices/control
Content-Type: application/json

{
  "deviceId": "NODEMCU_001",
  "relay": true,
  "led": false
}
```

#### Tüm Cihazları Listeleme (GET)
```http
GET /api/devices
```

## 📡 NodeMCU Kurulumu

### 1. Arduino IDE Kurulumu

1. [Arduino IDE](https://www.arduino.cc/en/software) indirin ve kurun
2. Dosya → Tercihler → Ek Devre Kartları Yöneticisi URL'leri:
   ```
   http://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
3. Araçlar → Kart → Kart Yöneticisi → "ESP8266" ara ve kur

### 2. Gerekli Kütüphaneleri Yükleyin

Taslak → Kütüphane Ekle → Kütüphaneleri Yönet:
- ESP8266WiFi
- ESP8266HTTPClient
- DHT sensor library
- ArduinoJson

### 3. NodeMCU Kodunu Yükleyin

`nodemcu/config.h` dosyasını düzenleyin:

```cpp
// WiFi Ayarları
#define WIFI_SSID "WiFi_Aginiz"
#define WIFI_PASSWORD "WiFi_Sifreniz"

// Server Ayarları
#define SERVER_URL "http://192.168.1.100:3000"
#define DEVICE_ID "NODEMCU_001"
#define API_KEY "your_device_api_key_here"

// Pin Tanımlamaları
#define DHT_PIN D4
#define PIR_PIN D5
#define LED_PIN D6
#define RELAY_PIN D7

// Sensör Ayarları
#define DHT_TYPE DHT11
#define UPDATE_INTERVAL 5000  // 5 saniye
```

`nodemcu/main.ino` örnek kod:

```cpp
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>
#include "config.h"

DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient wifiClient;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(PIR_PIN, INPUT);
  
  dht.begin();
  connectWiFi();
}

void connectWiFi() {
  Serial.println("WiFi'ye bağlanılıyor...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi bağlantısı başarılı!");
  Serial.print("IP Adresi: ");
  Serial.println(WiFi.localIP());
}

void sendSensorData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  bool motion = digitalRead(PIR_PIN);
  
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Sensör okuma hatası!");
    return;
  }
  
  HTTPClient http;
  http.begin(wifiClient, String(SERVER_URL) + "/api/sensors/data");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("X-API-Key", API_KEY);
  
  StaticJsonDocument<200> doc;
  doc["deviceId"] = DEVICE_ID;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["motion"] = motion;
  
  String jsonData;
  serializeJson(doc, jsonData);
  
  int httpCode = http.POST(jsonData);
  
  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("Veri gönderildi: " + response);
  } else {
    Serial.println("HTTP hatası: " + String(httpCode));
  }
  
  http.end();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    sendSensorData();
  } else {
    connectWiFi();
  }
  
  delay(UPDATE_INTERVAL);
}
```

### 4. Kodu Yükleyin

1. NodeMCU'yu USB ile bilgisayara bağlayın
2. Araçlar → Kart → NodeMCU 1.0 (ESP-12E Module)
3. Araçlar → Port → (NodeMCU'nun bağlı olduğu port)
4. Yükle butonuna tıklayın

## 📊 Web Dashboard

Web dashboard aşağıdaki özellikleri içerir:

### Ana Sayfa (`client/index.html`)
- Gerçek zamanlı sensör verileri
- Grafik görselleştirme
- Cihaz kontrol paneli
- Geçmiş veri analizi

### JavaScript Örneği (`client/js/app.js`)

```javascript
// Sunucuya bağlan
const API_URL = 'http://localhost:3000/api';

// Son verileri al
async function fetchLatestData() {
  try {
    const response = await fetch(`${API_URL}/sensors/latest?deviceId=NODEMCU_001`);
    const result = await response.json();
    
    if (result.success) {
      updateDashboard(result.data);
    }
  } catch (error) {
    console.error('Veri alma hatası:', error);
  }
}

// Dashboard güncelle
function updateDashboard(data) {
  document.getElementById('temperature').textContent = data.temperature.toFixed(1) + '°C';
  document.getElementById('humidity').textContent = data.humidity.toFixed(1) + '%';
  document.getElementById('motion').textContent = data.motion ? 'Algılandı' : 'Algılanmadı';
  document.getElementById('timestamp').textContent = new Date(data.timestamp).toLocaleString('tr-TR');
}

// Cihaz kontrolü
async function controlDevice(deviceId, state) {
  try {
    const response = await fetch(`${API_URL}/devices/control`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId: deviceId,
        relay: state
      })
    });
    
    const result = await response.json();
    console.log('Cihaz kontrolü:', result);
  } catch (error) {
    console.error('Kontrol hatası:', error);
  }
}

// Otomatik güncelleme
setInterval(fetchLatestData, 5000);
fetchLatestData();
```

## 🚀 Kullanım

### 1. Sistemi Başlatın

```bash
# Terminal 1: MongoDB'yi başlatın
mongod

# Terminal 2: Node.js sunucusunu başlatın
npm start

# Terminal 3 (Opsiyonel): Geliştirme modu ile frontend geliştirin
npm run dev
```

### 2. Web Dashboard'a Erişin

Tarayıcınızda şu adresi açın: `http://localhost:3000`

### 3. NodeMCU'yu Çalıştırın

NodeMCU'ya kodu yükledikten sonra güç verin. Otomatik olarak:
- WiFi'ye bağlanacak
- Sensör verilerini okuyacak
- Verileri sunucuya gönderecek

### 4. Verileri İzleyin

Dashboard'da gerçek zamanlı olarak:
- Sıcaklık ve nem değerlerini
- Hareket algılama durumunu
- Geçmiş verilerin grafiklerini görebilirsiniz

## 🔍 Sorun Giderme

### NodeMCU WiFi'ye Bağlanamıyor
- WiFi kimlik bilgilerini kontrol edin
- Router'ın 2.4GHz bandını kullandığından emin olun
- Sinyal gücünü kontrol edin

### Veri Sunucuya Gönderilmiyor
- Server URL'sinin doğru olduğunu kontrol edin
- Firewall ayarlarını kontrol edin
- Serial Monitor'den hata mesajlarını inceleyin

### MongoDB Bağlantı Hatası
- MongoDB servisinin çalıştığını kontrol edin
- Bağlantı string'ini kontrol edin
- Port'un açık olduğunu kontrol edin

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/YeniOzellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📧 İletişim

**Proje Sahibi**: TroubledKezoo1

**Proje Linki**: [https://github.com/TroubledKezoo1/SMARTNEST](https://github.com/TroubledKezoo1/SMARTNEST)

## 🙏 Teşekkürler

- ESP8266 Community
- MongoDB Team
- Node.js Community
- Tüm katkıda bulunanlara

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

**Son Güncelleme**: 05.01.2026
