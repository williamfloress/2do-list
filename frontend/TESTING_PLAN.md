# 🧪 Testing Plan - Phase 2

## Section 11.1: Authentication Tests

### Test 1: Signup with Valid Data
**Steps:**
1. Navigate to `/register`
2. Enter a valid email (e.g., `test@example.com`)
3. Enter a password with at least 6 characters
4. Enter matching password in confirm field
5. Click "Create Account"

**Expected Results:**
- ✅ Success toast notification appears
- ✅ Redirects to login page or dashboard
- ✅ Email confirmation message appears (if email confirmation is enabled)
- ✅ User is created in Supabase

**Status:** [X] Pass / [ ] Fail

---

### Test 2: Signup with Invalid Data
**Test Cases:**

#### Test 2a: Invalid Email Format
**Steps:**
1. Navigate to `/register`
2. Enter invalid email: `invalid-email`
3. Enter valid password
4. Click "Create Account"

**Expected Results:**
- ✅ Validation error appears: "Por favor ingresa un email válido"
- ✅ Submit button is disabled
- ✅ Toast error notification appears

**Status:** [x] Pass / [ ] Fail

#### Test 2b: Password Too Short
**Steps:**
1. Navigate to `/register`
2. Enter valid email
3. Enter password with less than 6 characters: `abc`
4. Click "Create Account"

**Expected Results:**
- ✅ Validation error appears: "La contraseña debe tener al menos 6 caracteres"
- ✅ Submit button is disabled
- ✅ Toast error notification appears

**Status:** [x] Pass / [ ] Fail

#### Test 2c: Password Mismatch
**Steps:**
1. Navigate to `/register`
2. Enter valid email
3. Enter password: `password123`
4. Enter different password in confirm field: `password456`
5. Click "Create Account"

**Expected Results:**
- ✅ Validation error appears: "Las contraseñas no coinciden"
- ✅ Submit button is disabled
- ✅ Toast error notification appears

**Status:** [x] Pass / [ ] Fail

---

### Test 3: Login with Valid Credentials
**Prerequisites:** User must exist from Test 1

**Steps:**
1. Navigate to `/login`
2. Enter valid email from Test 1
3. Enter correct password
4. Click "Sign In"

**Expected Results:**
- ✅ Success toast: "¡Bienvenido de nuevo!"
- ✅ Redirects to `/dashboard`
- ✅ Navbar shows user email
- ✅ User is authenticated

**Status:** [x] Pass / [ ] Fail

---

### Test 4: Login with Invalid Credentials
**Test Cases:**

#### Test 4a: Wrong Email
**Steps:**
1. Navigate to `/login`
2. Enter non-existent email: `wrong@example.com`
3. Enter any password
4. Click "Sign In"

**Expected Results:**
- ✅ Error toast appears: "Invalid login credentials"
- ✅ User stays on login page
- ✅ No navigation occurs

**Status:** [x] Pass / [ ] Fail

#### Test 4b: Wrong Password
**Prerequisites:** User exists

**Steps:**
1. Navigate to `/login`
2. Enter correct email
3. Enter wrong password
4. Click "Sign In"

**Expected Results:**
- ✅ Error toast appears: "Invalid login credentials"
- ✅ User stays on login page
- ✅ No navigation occurs

**Status:** [x] Pass / [ ] Fail

#### Test 4c: Empty Fields
**Steps:**
1. Navigate to `/login`
2. Leave email or password empty
3. Click "Sign In"

**Expected Results:**
- ✅ HTML5 validation prevents submission
- ✅ Form shows native validation messages
- ✅ Validation errors appear

**Status:** [x] Pass / [ ] Fail

---

### Test 5: Logout
**Prerequisites:** User must be logged in

**Steps:**
1. Navigate to `/dashboard` (while logged in)
2. Click "Logout" button in Navbar
3. Confirm logout in modal

**Expected Results:**
- ✅ Confirmation modal appears
- ✅ Success toast: "Sesión cerrada exitosamente"
- ✅ Redirects to `/login`
- ✅ User session is cleared
- ✅ Protected routes are no longer accessible

**Status:** [x] Pass / [ ] Fail

---

### Test 6: Protected Routes (Without Login)
**Steps:**
1. Ensure you are logged out
2. Manually navigate to `/dashboard`

**Expected Results:**
- ✅ Automatically redirects to `/login`
- ✅ Cannot access dashboard without authentication
- ✅ ProtectedRoute component works correctly

**Status:** [x] Pass / [ ] Fail

---

### Test 7: Session Persistence (Page Reload)
**Prerequisites:** User must be logged in

**Steps:**
1. Login with valid credentials
2. Verify you're on `/dashboard`
3. Refresh the page (F5 or Ctrl+R)

**Expected Results:**
- ✅ Page reloads successfully
- ✅ User remains logged in
- ✅ Still on `/dashboard`
- ✅ No redirect to login
- ✅ Session is maintained
- ✅ Loading state appears briefly during session check

**Status:** [x] Pass / [ ] Fail

---

### Test 8: Session Expiration
**Note:** This may require Supabase configuration

**Steps:**
1. Login successfully
2. Wait for session to expire (may need to manually expire in Supabase dashboard)

**Expected Results:**
- ✅ User is logged out automatically
- ✅ Redirected to login page
- ✅ Error message appears: "Session expired"

**Status:** [ ] Pass / [ ] Fail

---

## Testing Notes

### Tools for Testing
- Browser DevTools (F12)
- React DevTools Extension
- Network Tab for API calls
- Supabase Dashboard for database verification

### How to Verify Tests
1. Check console for errors (F12 → Console)
2. Check Network tab for API responses
3. Verify Supabase Auth in Dashboard
4. Check localStorage for session tokens
5. Verify toast notifications appear
6. Check URL navigation

### Common Issues to Watch For
- CORS errors
- Network timeouts
- Supabase connection issues
- Browser cache interfering
- Multiple tabs with same session

---

## Quick Test Checklist

Print or use this checklist for quick testing:

```
Authentication Tests:
[ ] Test 1: Signup with valid data
[ ] Test 2: Signup with invalid data
  [ ] Invalid email format
  [ ] Password too short
  [ ] Password mismatch
[ ] Test 3: Login with valid credentials
[ ] Test 4: Login with invalid credentials
  [ ] Wrong email
  [ ] Wrong password
  [ ] Empty fields
[ ] Test 5: Logout
[ ] Test 6: Protected routes
[ ] Test 7: Session persistence
[ ] Test 8: Session expiration
```

---

**Completed by:** ___________  
**Date:** ___________  
**Total Tests Passed:** ___ / ___

