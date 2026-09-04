# fleunique-knk41

## Setup

```bash
git clone https://github.com/berezovskyivalerii/fleunique-knk41.git
cd fleunique-knk41
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

* App: `http://localhost:5173`

---

## Git Workflow

1. Create a branch:
```bash
git checkout -b <type>/<taskID>-<short-description>
```

examples:
```bash
git checkout -b feature/52-logger
git checkout -b bugfix/67-cors-error
git checkout -b refactor/1488-api-client
```


2. Commit changes:
```bash
git commit -m "<message>"
```


3. Push and open a Pull Request:
```bash
git push -u origin feature/<description>
```
