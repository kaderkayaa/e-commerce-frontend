import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            home: "Home",
            about: "About",
            contact: "Contact",
            login: "Login",
            logout: "Log out",
            favorites: "Favorites",
            basket: "Basket",
            emptyCart: "Your cart is empty.",
            yourBasket: "Your Basket",
            productRemoved: "Product removed from basket.",
            basketCleared: "Basket cleared.",
            total: "Total",
            clearAll: "Clear All",
            continueShopping: "Continue Shopping",
            pay: "Pay",
            noProducts: "No products found",
            price: "Price",
            favoritesEmpty: "Your favorites is empty",
            yourFavorites: "Your Favorites",
            productAddedToBasket: "Product added to basket.",
            removedFromFavorites: "Removed from favorites.",
            allFavoritesCleared: "All favorites cleared.",
            removeFromFavorites: "Remove from favorites",
            loadingProducts: "Loading products...",
            filter: "Filter",
            search: "Search",
            reset: "Reset",
            addedToFavorites: "Added to favorites.",
            removedFromFavorites: "Removed from favorites.",
            noProductFound: "No product suitable for the filter was found.",
            addToCart: "Add To Cart",
            signUp: "Sign Up",
            signIn: "Sign In",
            name: "Name",
            email: "Email",
            password: "Password",
            registrationSuccess: "Registration successful! You can log in.",
            userNotFound: "User not found!",
            loginSuccess: "Login successful.",
            emailOrPasswordIncorrect: "Email or password is incorrect!",
            alreadyHaveAccount: "Do you already have an account?",
            dontHaveAccount: "Don't you have an account?",
            logoutBtn: "Exited."
        }
    },
    tr: {
        translation: {
            home: "Ana Sayfa",
            about: "Hakkında",
            contact: "İletişim",
            login: "Giriş",
            logout: "Çıkış Yap",
            favorites: "Favoriler",
            basket: "Sepet",
            addToCart: "Sepete Ekle",
            emptyCart: "Sepetiniz boş.",
            yourBasket: "Sepetiniz",
            productRemoved: "Ürün sepetten çıkarıldı.",
            basketCleared: "Sepet temizlendi.",
            total: "Toplam",
            clearAll: "Hepsini Temizle",
            continueShopping: "Alışverişe Devam Et",
            pay: "Öde",
            noProducts: "Ürün bulunamadı",
            price: "Fiyat",
            favoritesEmpty: "Favorileriniz boş",
            yourFavorites: "Favorileriniz",
            productAddedToBasket: "Ürün sepete eklendi.",
            removedFromFavorites: "Favorilerden çıkarıldı.",
            allFavoritesCleared: "Tüm favoriler temizlendi.",
            removeFromFavorites: "Favorilerden çıkar",
            loadingProducts: "Ürünler yükleniyor...",
            filter: "Filtrele",
            search: "Ara",
            reset: "Temizle",
            addedToFavorites: "Favorilere eklendi.",
            noProductFound: "Filtreye uygun ürün bulunamadı.",
            addToCart: "Sepete Ekle",
            signUp: "Kayıt Ol",
            signIn: "Giriş Yap",
            name: "İsim",
            email: "E-posta",
            password: "Şifre",
            registrationSuccess: "Kayıt başarılı! Giriş yapabilirsiniz.",
            userNotFound: "Kullanıcı bulunamadı!",
            loginSuccess: "Giriş başarılı.",
            emailOrPasswordIncorrect: "E-posta veya şifre yanlış!",
            alreadyHaveAccount: "Zaten hesabınız var mı?",
            dontHaveAccount: "Hesabınız yok mu?",
            logoutBtn: "Çıkış Yapıldı."
        }
    }
};



i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
