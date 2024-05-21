### Scenariusze Testowe dla Rejestracji i Logowania Użytkownika

#### ID: TC001

#### Przypadek testowy: Logowanie użytkownika z niepoprawnymi danymi

**Opis**: 
Test sprawdza, czy system prawidłowo reaguje na próbę logowania z niepoprawnymi danymi uwierzytelniającymi, wyświetlając komunikat "Wrong password or email".

**Wymagania wstępne**:
- Aplikacja jest uruchomiona, a strona logowania jest dostępna.

**Kroki**:
1. Otwórz stronę logowania.
2. Wprowadź niepoprawny adres e-mail w polu "Email" (np. nieistniejący adres w systemie).
3. Wprowadź niepoprawne hasło w polu "Password".
4. Kliknij przycisk "Login".

**Expected Result**:
- Wyświetla się komunikat "Wrong password or email".

---

#### ID: TC002

#### Przypadek testowy: Logowanie użytkownika z poprawnymi danymi

**Opis**: 
Test sprawdza, czy system prawidłowo reaguje na próbę logowania z poprawnymi danymi uwierzytelniającymi, przekierowując użytkownika na stronę główną.

**Wymagania wstępne**:
- Aplikacja jest uruchomiona, a strona logowania jest dostępna.
- Użytkownik o podanym adresie e-mail i haśle istnieje w systemie.

**Kroki**:
1. Otwórz stronę logowania.
2. Wprowadź poprawny adres e-mail w polu "Email".
3. Wprowadź poprawne hasło w polu "Password".
4. Kliknij przycisk "Login".

**Expected Result**:
- Użytkownik zostaje przekierowany na stronę główną.

---

#### ID: TC003

#### Przypadek testowy: Rejestracja użytkownika z poprawnymi danymi

**Opis**: 
Test sprawdza, czy użytkownik może poprawnie zarejestrować się do systemu przy użyciu poprawnych danych, a następnie czy zostanie wyświetlony komunikat o założeniu konta i użytkownik zostanie przekierowany na stronę logowania.

**Wymagania wstępne**:
- Aplikacja jest uruchomiona, a strona rejestracji jest dostępna.
- Użytkownik o podanym adresie e-mail nie istnieje w systemie.

**Kroki**:
1. Otwórz stronę rejestracji.
2. Wprowadź poprawny adres e-mail w polu "Email".
3. Wprowadź poprawne hasło w polu "Password".
4. Wprowadź poprawne imię w polu "Name".
5. Kliknij przycisk "Sign Up".

**Expected Result**:
- Wyświetla się komunikat "Account created!".
- Po 1 sekundzie użytkownik zostaje przekierowany na stronę logowania.
