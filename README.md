# WhatsApp API Gateway (Baileys)

Simple WhatsApp API Gateway menggunakan library [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) dan Express.js.

## Fitur

- **Kirim Pesan**: API endpoint untuk mengirim pesan teks.
- **Webhook**: Meneruskan pesan masuk ke URL webhook yang dikonfigurasi.
- **Auto Reconnect**: Otomatis menyambung kembali jika koneksi terputus.
- **Multi-Device Support**: Mendukung fitur multi-device WhatsApp.
- **QR Code**: Menampilkan QR Code via terminal dan endpoint API.

## Instalasi

1.  Clone repository ini (atau unduh).
2.  Install dependensi:
    ```bash
    npm install
    ```

## Konfigurasi

Buat file `.env` di root folder (jika belum ada) dan sesuaikan konfigurasinya:

```env
PORT=3000
WEBHOOK_URL=http://localhost:3000/webhook-test
SESSION_PATH=./auth_info_baileys
```

- `PORT`: Port server berjalan.
- `WEBHOOK_URL`: URL dimana pesan masuk akan di-POST kan.
- `SESSION_PATH`: Folder penyimpanan sesi login WhatsApp.

## Menjalankan Server

```bash
node index.js
```

Saat pertama kali dijalankan, scan QR Code yang muncul di terminal atau akses endpoint QR di browser.

## Dokumentasi API

Base URL: `http://localhost:3000` (default)

### 1. Cek Status Koneksi
Mendapatkan status koneksi WhatsApp.

- **URL**: `/api/status`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "status": "connected",
      "user": { ... }
    }
    ```

### 2. Scan QR Code
Mendapatkan tampilan QR Code untuk login (jika belum terhubung).

- **URL**: `/api/qr`
- **Method**: `GET`
- **Response**: HTML Page containing QR Code image.

### 3. Kirim Pesan
Mengirim pesan teks ke nomor tertentu.

- **URL**: `/api/send-message`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "jid": "628123456789@s.whatsapp.net",
      "message": {
        "text": "Halo, ini pesan dari API!"
      }
    }
    ```
    *Catatan: `jid` harus diakhiri dengan `@s.whatsapp.net` untuk personal chat.*

## Webhook Payload

Ketika pesan diterima, server akan mengirim POST request ke `WEBHOOK_URL` dengan format body:

```json
{
  "event": "messages.upsert",
  "data": {
    "key": {
      "remoteJid": "628xxx@s.whatsapp.net",
      "fromMe": false,
      "id": "..."
    },
    "message": {
      "conversation": "Isi pesan..."
    },
    ...
  }
}
```
