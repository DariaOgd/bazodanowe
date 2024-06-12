# Paperback Paradise

## 1. Charakterystyka oprogramowania
### Paperback Paradise - Portal do sprzedaży książek

Paperback Paradise to portal, którego celem jest umożliwienie użytkownikom kupna i sprzedaży książek. Platforma oferuje funkcje takie jak zakładanie profili, zarządzanie ogłoszeniami, przeglądanie i filtrowanie ofert, komunikację między użytkownikami oraz zarządzanie zamówieniami i koszykiem.

## 2. Prawa autorskie

Autorzy: Daria Ogdowska i Matylda Głazik, Michał Buchar 

MIT License

Copyright (c) 2024 Daria Ogdowska, Matylda Głazik



## 3. Specyfikacja wymagań

### Priorytet:
- #1 - Wymagane
- #2 - Przydatne
- #3 - Opcjonalne

### Identyfikacja : f - funkcjonalne; nf - niefunkcjonalne

| Identyfikator | Nazwa                     | Opis                                                     | Priorytet | Kategoria         |
|---------------|---------------------------|----------------------------------------------------------|-----------|-------------------|
| 1f            | Autoryzacja               | Umożliwia użytkownikowi założenie profilu oraz logowanie  | 1         | Funkcjonalne      |
| 2f            | Zarządzanie ogłoszeniami  | Użytkownik może dodawać, edytować i usuwać ogłoszenia stworzone przez niego | 1         | Funkcjonalne      |
| 3f            | Przeglądanie ogłoszeń     | Użytkownik może przeglądać ogłoszenia na stronie głównej | 1         | Funkcjonalne      |
| 4f            | Przeglądanie szczegółów   | Użytkownik może przeglądać szczegóły ogłoszeń            | 1         | Funkcjonalne      |
| 5f            | Zarządzanie koszykiem     | Użytkownik może dodawać, usuwać i przeglądać zawartość koszyka | 1         | Funkcjonalne      |
| 6f            | Składanie zamówienia      | Użytkownik może złożyć zamówienie                        | 2         | Funkcjonalne      |
| 7f            | Wyświetlanie zamówień     | Użytkownik może przeglądać swoje zamówienia              | 2         | Funkcjonalne      |
| 8f            | Czat                      | Użytkownik może komunikować się ze sprzedawcami          | 3         | Funkcjonalne      |
| 9f           | Filtrowanie ogłoszeń      | Użytkownik może filtrować ogłoszenia                     | 3         | Funkcjonalne      |
| 10f           | Sortowanie ogłoszeń       | Użytkownik może sortować ogłoszenia                      | 3         | Funkcjonalne      |
| 11nf          | Graficzny interfejs       | Będzie istniał graficzny interfejs                       | 1         | Niefunkcjonalna   |
| 12nf          | Przechodzenie pomiędzy funkcjonalnościami poprzez maksymalnie 5 kliknięć | Umożliwia użytkownikowi szybkie przechodzenie między funkcjonalnościami | 2 | Niefunkcjonalna |

## 4. Architektura systemu/oprogramowania

### a. Stos technologiczny

#### Frontend:
- React
- JavaScript/JSX
- HTML/CSS
- React Router
- React Query
- Sass

#### Backend:
- Node.js
- Express.js
- MongoDB



### b. Architektura uruchomieniowa

#### Struktura plików:

**Foldery główne:**
- **api**: Kod serwera aplikacji (backend).
- **client**: Kod klienta aplikacji (frontend).

**Backend (api):**
- **models**: Zawiera modele danych do interakcji z bazą danych.
- **routes**: Zawiera pliki z definicjami tras dla API.
- **controllers**: Zawiera logikę aplikacji do obsługi żądań API.
- **utils**: Zawiera pomocnicze funkcje lub moduły.
- **server.js**: Główny plik uruchamiający serwer aplikacji.

**Frontend (client):**
- **public**: Zawiera statyczne pliki publiczne (obrazy, pliki HTML, itp.).
- **src**: Główne źródło kodu frontendowego:
  - **components**: Zawiera komponenty wielokrotnego użytku.
  - **pages**: Zawiera komponenty stron aplikacji.
  - **reducers**: Zawiera reduktory stanu aplikacji.
  - **utils**: Zawiera pomocnicze funkcje lub moduły.



### Wymagania wstępne

Upewnij się, że masz zainstalowane następujące oprogramowanie:
- [Node.js](https://nodejs.org/) (zalecana wersja LTS)
- [MongoDB](https://www.mongodb.com/try/download/community) (lokalnie lub jako usługa chmurowa, np. MongoDB Atlas)
- [Git](https://git-scm.com/)

### Kroki uruchomienia
```bash
cd api
Sklonuj repozytorium z GitHub
Otwórz terminal i wykonaj następujące polecenie, aby sklonować repozytorium:
git clone <https://github.com/DariaOgd/bazodanowe>
cd <bazodanowe>

Zainstaluj zależności dla serwera (backend)
Przejdź do folderu api i zainstaluj zależności, wykonując poniższe polecenia:

npm install

Zainstaluj zależności dla klienta (frontend)
Przejdź do folderu client i zainstaluj zależności, wykonując poniższe polecenia:
cd ../client
npm install

Utwórz plik .env
W folderze api utwórz plik .env z następującą zawartością, dostosowując wartości do swoich potrzeb:
PORT=8800
MONGO_URI=<URL-do-Twojej-Bazy-Danych-MongoDB>
JWT_SECRET=<Twój-Sekretny-Klucz-JWT>

Uruchom serwer (backend)
Wróć do folderu api i uruchom serwer, wykonując poniższe polecenie:
cd ../api
npm start


Uruchom aplikację klienta (frontend)
Przejdź do folderu client i uruchom aplikację, wykonując poniższe polecenie:
cd ../client
npm start
```
## 5. Testy

# Scenariusze Testowe dla funkcjonalności "Autoryzacja" (Identyfikator: 1f)


### TC001: Rejestracja użytkownika z poprawnymi danymi
- **Opis**: Test sprawdza, czy użytkownik może poprawnie zarejestrować się do systemu przy użyciu poprawnych danych.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, a strona rejestracji jest dostępna. Użytkownik o podanym adresie e-mail nie istnieje w systemie.
- **Kroki**:
  1. Otwórz stronę rejestracji.
  2. Wprowadź poprawny adres e-mail w polu "Email".
  3. Wprowadź poprawne hasło w polu "Password".
  4. Wprowadź poprawne imię w polu "Name".
  5. Kliknij przycisk "Sign Up".
- **Oczekiwany wynik**:
  - Wyświetla się komunikat "Account created!".
  - Po 1 sekundzie użytkownik zostaje przekierowany na stronę logowania.

### TC002: Logowanie użytkownika z poprawnymi danymi
- **Opis**: Test sprawdza, czy system prawidłowo reaguje na próbę logowania z poprawnymi danymi uwierzytelniającymi.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, a strona logowania jest dostępna. Użytkownik o podanym adresie e-mail i haśle istnieje w systemie.
- **Kroki**:
  1. Otwórz stronę logowania.
  2. Wprowadź poprawny adres e-mail w polu "Email".
  3. Wprowadź poprawne hasło w polu "Password".
  4. Kliknij przycisk "Login".
- **Oczekiwany wynik**: Użytkownik zostaje przekierowany na stronę główną.

### TC003: Logowanie użytkownika z niepoprawnymi danymi
- **Opis**: Test sprawdza, czy system prawidłowo reaguje na próbę logowania z niepoprawnymi danymi uwierzytelniającymi.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, a strona logowania jest dostępna.
- **Kroki**:
  1. Otwórz stronę logowania.
  2. Wprowadź niepoprawny adres e-mail w polu "Email" (np. nieistniejący adres w systemie).
  3. Wprowadź niepoprawne hasło w polu "Password".
  4. Kliknij przycisk "Login".
- **Oczekiwany wynik**: Wyświetla się komunikat "Wrong password or email".

### TC004: Rejestracja użytkownika z już istniejącym adresem e-mail
- **Opis**: Test sprawdza, czy system prawidłowo reaguje na próbę rejestracji z adresem e-mail, który już istnieje w systemie.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, a strona rejestracji jest dostępna. Użytkownik o podanym adresie e-mail istnieje w systemie.
- **Kroki**:
  1. Otwórz stronę rejestracji.
  2. Wprowadź adres e-mail, który już istnieje w systemie, w polu "Email".
  3. Wprowadź hasło w polu "Password".
  4. Wprowadź imię w polu "Name".
  5. Kliknij przycisk "Sign Up".
- **Oczekiwany wynik**: Wyświetla się komunikat "Email already exists!".

# Test Case dla funkcjonalności "Zarządzanie ogłoszeniami" (Identyfikator: 2f)

### TC001: Dodawanie nowego ogłoszenia z poprawnymi danymi
- **Opis**: Test sprawdza, czy użytkownik może poprawnie dodać nowe ogłoszenie przy użyciu poprawnych danych.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Użytkownik jest zalogowany. Strona dodawania ogłoszenia jest dostępna.
- **Kroki**:
  1. Otwórz stronę dodawania ogłoszenia.
  2. Wprowadź poprawny tytuł w polu "Title".
  3. Wybierz kategorię z listy rozwijanej "Category".
  4. Wybierz stan z listy rozwijanej "State".
  5. Wprowadź poprawny opis w polu "Description".
  6. Wprowadź poprawną cenę w polu "Price".
  7. Dodaj zdjęcia produktu.
  8. Kliknij przycisk "Create".
- **Oczekiwany wynik**: Użytkownik zostaje przekierowany na stronę główną i wizi swój produkt.

### TC002: Edytowanie istniejącego ogłoszenia
- **Opis**: Test sprawdza, czy użytkownik może poprawnie edytować istniejące ogłoszenie.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Użytkownik jest zalogowany. Użytkownik posiada ogłoszenie do edycji.
- **Kroki**:
  1. Otwórz stronę edycji ogłoszenia.
  2. Wprowadź nowy tytuł w polu "Title".
  3. Wybierz nową kategorię z listy rozwijanej "Category".
  4. Wybierz nowy stan z listy rozwijanej "State".
  5. Wprowadź nowy opis w polu "Description".
  6. Wprowadź nową cenę w polu "Price".
  7. Dodaj nowe zdjęcia produktu.
  8. Kliknij przycisk "Save Changes".
- **Oczekiwany wynik**: Dane produktu zostają zmienione w bazie i użytkownik zostaje przekierowany na stronę główną.

### TC003: Usuwanie istniejącego ogłoszenia
- **Opis**: Test sprawdza, czy użytkownik może poprawnie usunąć istniejące ogłoszenie.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Użytkownik jest zalogowany. Użytkownik posiada ogłoszenie do usunięcia.
- **Kroki**:
  1. Otwórz stronę z ogłoszeniem.
  2. Kliknij ikonę kosza (trash icon).
  3. Potwierdź usunięcie ogłoszenia.
- **Oczekiwany wynik**: Wyświetla się komunikat "Product has been deleted successfully." i ogłoszenie znika z listy ogłoszeń użytkownika.



# Test Case dla funkcjonalności "Przeglądanie ogłoszeń" (Identyfikator: 3f)

### TC001: Przeglądanie ogłoszeń na stronie głównej
- **Opis**: Test sprawdza, czy użytkownik może przeglądać dostępne ogłoszenia na stronie głównej.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona główna jest dostępna. Baza danych zawiera ogłoszenia.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Sprawdź, czy wyświetlają się ogłoszenia.
- **Oczekiwany wynik**: Lista ogłoszeń jest widoczna na stronie głównej.

### TC002: Sortowanie ogłoszeń wg najnowszych
- **Opis**: Test sprawdza, czy użytkownik może sortować ogłoszenia wg najnowszych.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona główna jest dostępna. Baza danych zawiera ogłoszenia.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Kliknij na "Sort by" i wybierz "Newest".
- **Oczekiwany wynik**: Ogłoszenia są posortowane według daty dodania od najnowszych.

### TC003: Sortowanie ogłoszeń wg najstarszych
- **Opis**: Test sprawdza, czy użytkownik może sortować ogłoszenia wg najstarszych.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona główna jest dostępna. Baza danych zawiera ogłoszenia.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Kliknij na "Sort by" i wybierz "Oldest".
- **Oczekiwany wynik**: Ogłoszenia są posortowane według daty dodania od najstarszych.

### TC004: Filtrowanie ogłoszeń wg kategorii
- **Opis**: Test sprawdza, czy użytkownik może filtrować ogłoszenia wg wybranej kategorii.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona główna jest dostępna. Baza danych zawiera ogłoszenia.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Wybierz kategorię z listy kategorii.
- **Oczekiwany wynik**: Wyświetlają się tylko ogłoszenia z wybranej kategorii.

### TC005: Wyszukiwanie ogłoszeń wg tytułu
- **Opis**: Test sprawdza, czy użytkownik może wyszukiwać ogłoszenia wg tytułu.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona główna jest dostępna. Baza danych zawiera ogłoszenia.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Wpisz tytuł ogłoszenia w polu wyszukiwania.
- **Oczekiwany wynik**: Wyświetlają się tylko ogłoszenia, które zawierają wpisany tytuł.

# Test Case dla funkcjonalności "Przeglądanie szczegółów" (Identyfikator: 4f)

### TC001: Przeglądanie szczegółów ogłoszenia
- **Opis**: Test sprawdza, czy użytkownik może przeglądać szczegóły wybranego ogłoszenia.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona główna jest dostępna. Baza danych zawiera ogłoszenia.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Kliknij na wybrane ogłoszenie.
- **Oczekiwany wynik**: Użytkownik zostaje przekierowany na stronę ze szczegółami ogłoszenia, gdzie widzi wszystkie informacje o produkcie.

### TC002: Sprawdzanie wyświetlania informacji o sprzedawcy
- **Opis**: Test sprawdza, czy informacje o sprzedawcy są wyświetlane poprawnie na stronie szczegółów ogłoszenia.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona ze szczegółami ogłoszenia jest dostępna. Baza danych zawiera ogłoszenia i użytkowników.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Kliknij na wybrane ogłoszenie.
  3. Sprawdź, czy wyświetlają się informacje o sprzedawcy
- **Oczekiwany wynik**: Informacje o sprzedawcy są wyświetlane poprawnie na stronie szczegółów ogłoszenia.

### TC003: Przeglądanie szczegółów kupionego produktu
- **Opis**: Test sprawdza, czy na stronie szczegółów ogłoszenia wyświetla się komunikat, że produkt został kupiony.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona ze szczegółami ogłoszenia jest dostępna. Baza danych zawiera ogłoszenia, a przynajmniej jedno z nich ma ustawioną wartość `bought` na `true`.
- **Kroki**:
  1. Otwórz stronę główną.
  2. Kliknij na ogłoszenie, którego produkt został kupiony.
- **Oczekiwany wynik**: Na stronie szczegółów ogłoszenia wyświetla się komunikat "This product has been bought".




# Test Case dla funkcjonalności "Zarządzanie koszykiem" (Identyfikator: 5f)

### TC001: Dodawanie produktu do koszyka
- **Opis**: Test sprawdza, czy użytkownik może dodać produkt do koszyka.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, strona szczegółów ogłoszenia jest dostępna.
- **Kroki**:
  1. Otwórz stronę szczegółów ogłoszenia.
  2. Kliknij przycisk "Add to cart".
- **Oczekiwany wynik**: Produkt zostaje dodany do koszyka.

### TC002: Usuwanie produktu z koszyka
- **Opis**: Test sprawdza, czy użytkownik może usunąć produkt z koszyka.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, koszyk zawiera przynajmniej jeden produkt.
- **Kroki**:
  1. Otwórz stronę koszyka.
  2. Kliknij przycisk "Remove" obok wybranego produktu.
- **Oczekiwany wynik**: Produkt zostaje usunięty z koszyka
### TC003: Przeglądanie zawartości koszyka
- **Opis**: Test sprawdza, czy użytkownik może przeglądać zawartość swojego koszyka.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, użytkownik dodał produkty do koszyka.
- **Kroki**:
  1. Otwórz stronę koszyka.
- **Oczekiwany wynik**: Użytkownik widzi listę produktów dodanych do koszyka wraz z ich szczegółami.

### TC004: Sprawdzenie łącznej kwoty koszyka
- **Opis**: Test sprawdza, czy łączna kwota produktów w koszyku jest prawidłowo obliczona.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, koszyk zawiera przynajmniej jeden produkt.
- **Kroki**:
  1. Otwórz stronę koszyka.
  2. Sprawdź łączną kwotę produktów w koszyku.
- **Oczekiwany wynik**: Łączna kwota produktów w koszyku jest poprawnie obliczona i wyświetlona.

### TC005: Przeglądanie pustego koszyka
- **Opis**: Test sprawdza, czy użytkownik może przeglądać pusty koszyk.
- **Priorytet**: 1
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, koszyk jest pusty.
- **Kroki**:
  1. Otwórz stronę koszyka.
- **Oczekiwany wynik**: Użytkownik widzi komunikat informujący, że koszyk jest pusty.


# Test Case dla funkcjonalności "Składanie zamówienia" (Identyfikator: 6f)

### TC001: Składanie zamówienia z poprawnymi danymi
- **Opis**: Test sprawdza, czy użytkownik może złożyć zamówienie z poprawnymi danymi.
- **Priorytet**: 2
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, koszyk zawiera przynajmniej jeden produkt, użytkownik jest zalogowany.
- **Kroki**:
  1. Otwórz stronę koszyka.
  2. Kliknij przycisk Koszyk
  3. Wypełnij formularz zamówienia poprawnymi danymi
  4. Kliknij przycisk "Pay Now".
- **Oczekiwany wynik**: Zamówienie zostaje złożone pomyślnie, użytkownik widzi komunikat potwierdzający złożenie zamówienia i zostaje przekierowany na stronę główną lub stronę potwierdzenia zamówienia.

# Test Case dla funkcjonalności "Wyświetlanie zamówień" (Identyfikator: 7f)

### TC001: Wyświetlanie zamówień użytkownika
- **Opis**: Test sprawdza, czy użytkownik może poprawnie wyświetlić swoje zamówienia.
- **Priorytet**: 2
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, użytkownik jest zalogowany i ma przynajmniej jedno zamówienie.
- **Kroki**:
  1. Zaloguj się na swoje konto.
  2. Przejdź do strony "Your Orders".
- **Oczekiwany wynik**: Wyświetla się lista zamówień użytkownika, każde zamówienie zawiera szczegóły takie jak ID zamówienia, całkowitą kwotę, status zamówienia oraz listę produktów w zamówieniu.

### TC002: Wyświetlanie zamówień dla użytkownika bez zamówień
- **Opis**: Test sprawdza, czy system prawidłowo reaguje, gdy użytkownik nie ma żadnych zamówień.
- **Priorytet**: 2
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, użytkownik jest zalogowany i nie ma żadnych zamówień.
- **Kroki**:
  1. Zaloguj się na swoje konto.
  2. Przejdź do strony "Your Orders".
- **Oczekiwany wynik**: Wyświetla się komunikat "You have no orders".


# Test Case dla funkcjonalności "Czat" (Identyfikator: 8f)

### TC001: Rozpoczęcie konwersacji ze sprzedawcą
- **Opis**: Test sprawdza, czy użytkownik może rozpocząć konwersację ze sprzedawcą.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, użytkownik jest zalogowany, istnieje sprzedawca z produktem.
- **Kroki**:
  1. Zaloguj się na swoje konto.
  2. Przejdź do profilu sprzedawcy, klikając na jeden z jego produktów.
  3. Kliknij przycisk "Message" na stronie profilu sprzedawcy.
- **Oczekiwany wynik**: Rozpoczyna się konwersacja ze sprzedawcą, użytkownik zostaje przekierowany na stronę czatu.

### TC002: Wysłanie wiadomości na czacie
- **Opis**: Test sprawdza, czy użytkownik może wysłać wiadomość na czacie.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, użytkownik jest zalogowany, istnieje aktywna konwersacja.
- **Kroki**:
  1. Zaloguj się na swoje konto.
  2. Przejdź do strony czatu.
  3. Wprowadź wiadomość w polu tekstowym.
  4. Kliknij przycisk "Send".
- **Oczekiwany wynik**: Wiadomość jest wysyłana i wyświetlana w oknie czatu.

### TC003: Wyświetlanie wiadomości na czacie
- **Opis**: Test sprawdza, czy wszystkie wiadomości w konwersacji są poprawnie wyświetlane.
- **Priorytet**: 3
- **Kategoria**: Funkcjonalne
- **Wymagania wstępne**: Aplikacja jest uruchomiona, użytkownik jest zalogowany, istnieje aktywna konwersacja z co najmniej jedną wiadomością.
- **Kroki**:
  1. Zaloguj się na swoje konto.
  2. Przejdź do strony czatu.
- **Oczekiwany wynik**: Wszystkie wiadomości w konwersacji są poprawnie wyświetlane, w tym wiadomości wysłane przez obie strony.
---

