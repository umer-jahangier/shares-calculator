# Share Calculator

## Server-based API Mode
This app now uses a secure backend server for all calculations. The Electron app communicates with the server via HTTP(S) API calls. Please see setup instructions below to run both the server and the Electron app.

---

**Share Calculator** is a simple, cross-platform desktop app built with Electron. It helps you manage your income based on ethical and family-based financial distribution.

## 🚀 Features

### ✅ Scenario 1 – *Direct Split*
Enter a total income amount, and the app:
- Deducts **10%** as **Charity**
- Splits the **remaining 90%**:
  - **40%** for **Yourself**
  - **30%** for **Parents**
  - **30%** for **Savings**

### ✅ Scenario 2 – *Reverse Calculation*
Enter your **desired personal share**, and the app:
- Calculates the **total income required** such that:
  - After 10% charity deduction
  - Your share is 40% of the remaining

## 🖥️ Platforms Supported

- ✅ Windows (`.exe`)
- ✅ macOS (`.dmg`)

> Automatic updates included! New versions are downloaded in the background.

## 🛠️ How It Works

Built using:
- [Electron](https://electronjs.org)
- [electron-updater](https://www.electron.build/auto-update)
- GitHub Actions for CI/CD

## 🧮 Sample Use Cases

**You enter `$1000`** →  
- Charity: `$100`  
- Remaining: `$900`  
  - Mine: `$360`  
  - Parents: `$270`  
  - Savings: `$270`

**You want `$200` for yourself** →  
- You must earn: `$555.56`

## 🧑‍💻 Developer Instructions

### ▶️ Run Locally
```bash
npm install
npm start
```

### 🏗️ Build Locally
```bash
npm run build
```

### 🚀 Publish a New Version
1. Update the version in `package.json`
2. Tag and push:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

## 📦 Download Latest
➡ [Releases Page](https://github.com/umer-jahangier/shares-calculator/releases)
