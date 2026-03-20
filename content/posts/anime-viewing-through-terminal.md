---
title: "Anime viewing through terminal"
date: "2026-03-20T08:05:33.319Z"
summary: "Use your unusable cmd prompt to watch anime at your ease"
tags: ["cmd","scoop"]
---

# 🎬 ani-cli — Complete Guide

`ani-cli` is a lightweight command-line tool that lets you stream and download anime directly from your terminal.

---

## 📦 Installation

### 🐧 Linux

#### Arch Linux
```bash
sudo pacman -S ani-cli
```

#### Ubuntu / Debian
```bash
sudo apt update
sudo apt install git curl mpv
```

Manual install:
```bash
git clone https://github.com/pystardust/ani-cli.git
cd ani-cli
chmod +x ani-cli
sudo mv ani-cli /usr/local/bin/
```

---

### 🍎 macOS
```bash
brew install ani-cli
```

---

### 🪟 Windows (WSL)

Install WSL:
```powershell
wsl --install
```

Inside WSL:
```bash
sudo apt update
sudo apt install git curl mpv
```

Install ani-cli:
```bash
git clone https://github.com/pystardust/ani-cli.git
cd ani-cli
chmod +x ani-cli
sudo mv ani-cli /usr/local/bin/
```

---

## ⚙️ Dependencies

- mpv  
- curl  
- grep  
- sed  
- awk  

```bash
sudo apt install mpv curl grep sed gawk
```

---

## ▶️ Usage

### Interactive
```bash
ani-cli
```

### Search
```bash
ani-cli "naruto"
```

### Episode
```bash
ani-cli "attack on titan" -e 1
```

### Continue
```bash
ani-cli -c
```

---

## 🎥 Quality

```bash
ani-cli -q 720 "bleach"
```

---

## ⬇️ Download

```bash
ani-cli -d "one piece"
```

---

## ⚙️ Config

```bash
export ANI_CLI_PLAYER=mpv
export ANI_CLI_QUALITY=720
```

---

## 🛠️ Troubleshooting

```bash
sudo apt install mpv
which ani-cli
```

---

## 🏁 Done

Enjoy anime in terminal 🍿
