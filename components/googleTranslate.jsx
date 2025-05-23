// components/GoogleTranslate.js
import { useEffect, useState } from "react";
import Head from "next/head";

const GoogleTranslate = ({
  className = "",
  showLabel = true,
  compact = false,
  variant = "default", // "default", "navbar", "minimal"
}) => {
  const [userCountryLanguage, setUserCountryLanguage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Country to language mapping
  const countryLanguageMap = {
    PK: "ur", // Pakistan - Urdu
    IN: "hi", // India - Hindi
    ES: "es", // Spain - Spanish
    FR: "fr", // France - French
    DE: "de", // Germany - German
    IT: "it", // Italy - Italian
    JP: "ja", // Japan - Japanese
    KR: "ko", // Korea - Korean
    CN: "zh", // China - Chinese
    RU: "ru", // Russia - Russian
    AR: "ar", // Arabic countries
    BR: "pt", // Brazil - Portuguese
    TR: "tr", // Turkey - Turkish
    NL: "nl", // Netherlands - Dutch
    SE: "sv", // Sweden - Swedish
    NO: "no", // Norway - Norwegian
    DK: "da", // Denmark - Danish
    FI: "fi", // Finland - Finnish
    GR: "el", // Greece - Greek
    PL: "pl", // Poland - Polish
    CZ: "cs", // Czech Republic - Czech
    HU: "hu", // Hungary - Hungarian
    RO: "ro", // Romania - Romanian
    BG: "bg", // Bulgaria - Bulgarian
    HR: "hr", // Croatia - Croatian
    SK: "sk", // Slovakia - Slovak
    SI: "sl", // Slovenia - Slovenian
    EE: "et", // Estonia - Estonian
    LV: "lv", // Latvia - Latvian
    LT: "lt", // Lithuania - Lithuanian
    TH: "th", // Thailand - Thai
    VN: "vi", // Vietnam - Vietnamese
    ID: "id", // Indonesia - Indonesian
    MY: "ms", // Malaysia - Malay
    PH: "tl", // Philippines - Filipino
    BD: "bn", // Bangladesh - Bengali
    LK: "si", // Sri Lanka - Sinhala
    AF: "ps", // Afghanistan - Pashto
    IR: "fa", // Iran - Persian
    IQ: "ar", // Iraq - Arabic
    SA: "ar", // Saudi Arabia - Arabic
    AE: "ar", // UAE - Arabic
    EG: "ar", // Egypt - Arabic
    MA: "ar", // Morocco - Arabic
    DZ: "ar", // Algeria - Arabic
    TN: "ar", // Tunisia - Arabic
    LY: "ar", // Libya - Arabic
    SD: "ar", // Sudan - Arabic
    JO: "ar", // Jordan - Arabic
    LB: "ar", // Lebanon - Arabic
    SY: "ar", // Syria - Arabic
    YE: "ar", // Yemen - Arabic
    OM: "ar", // Oman - Arabic
    KW: "ar", // Kuwait - Arabic
    QA: "ar", // Qatar - Arabic
    BH: "ar", // Bahrain - Arabic
  };

  // Language names for display
  const languageNames = {
    ur: "اردو",
    hi: "हिंदी",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    zh: "中文",
    ru: "Русский",
    ar: "العربية",
    pt: "Português",
    tr: "Türkçe",
    nl: "Nederlands",
    sv: "Svenska",
    no: "Norsk",
    da: "Dansk",
    fi: "Suomi",
    el: "Ελληνικά",
    pl: "Polski",
    cs: "Čeština",
    hu: "Magyar",
    ro: "Română",
    bg: "Български",
    hr: "Hrvatski",
    sk: "Slovenčina",
    sl: "Slovenščina",
    et: "Eesti",
    lv: "Latviešu",
    lt: "Lietuvių",
    th: "ไทย",
    vi: "Tiếng Việt",
    id: "Bahasa Indonesia",
    ms: "Bahasa Melayu",
    tl: "Filipino",
    bn: "বাংলা",
    si: "සිංහල",
    ps: "پښتو",
    fa: "فارسی",
  };

  // Get user's country and set language
  const getUserCountry = async () => {
    try {
      const response = await fetch("https://ipinfo.io/json/");
      const data = await response.json();
      const countryCode = data.country;

      if (countryLanguageMap[countryCode]) {
        setUserCountryLanguage(countryLanguageMap[countryCode]);
      } else {
        setUserCountryLanguage("es"); // Default to Spanish if country not found
      }
    } catch (error) {
      console.error("Error detecting country:", error);
      setUserCountryLanguage("es"); // Default fallback
    }
  };

  useEffect(() => {
    getUserCountry();
  }, []);

  useEffect(() => {
    if (!userCountryLanguage) return;

    // Load Google Translate script
    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: `en,${userCountryLanguage}`,
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
          },
          "google_translate_element"
        );
        setIsLoaded(true);
      }
    };

    // Check if script already exists
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [userCountryLanguage]);

  // Dynamic styles based on variant
  const getVariantStyles = () => {
    const baseStyles = `
      .goog-te-gadget {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-size: 0 !important;
        color: transparent !important;
      }
      
      .goog-te-gadget .goog-te-combo {
        margin: 0 !important;
        vertical-align: top !important;
      }
      
      .skiptranslate > iframe {
        height: 0 !important;
        border-style: none !important;
        box-shadow: none !important;
      }
      
      body {
        top: 0 !important;
      }
      
      .goog-te-banner-frame {
        display: none !important;
      }
      
      .goog-te-menu-value span:first-child {
        display: none !important;
      }
      
      .goog-te-menu-value:before {
        content: '🌐' !important;
        margin-right: 6px !important;
        font-size: 14px !important;
      }

      /* Force override Google Translate dropdown menu width */
      .VIpgJd-ZVi9od-vH1Gmf[id*="menuBody"] {
        width: 120px !important;
        min-width: 120px !important;
        box-sizing: border-box !important;
      }
      
      .VIpgJd-ZVi9od-vH1Gmf[id*="menuBody"] table {
        width: 100% !important;
      }
      
      .VIpgJd-ZVi9od-vH1Gmf[id*="menuBody"] td {
        width: 100% !important;
      }
      
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b,
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd {
        width: 100% !important;
        display: block !important;
        box-sizing: border-box !important;
        padding: 8px 12px !important;
      }
      
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b div,
      .VIpgJd-ZVi9od-vH1Gmf-ibnC6b-gk6SMd div {
        width: 100% !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
    `;

    const variantStyles = {
      default: `
        .goog-te-combo {
          background-color: #ffffff !important;
          border: 2px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
          color: #374151 !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          min-width: 140px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
        
        .goog-te-combo:hover {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-1px) !important;
        }
        
        .goog-te-combo:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
      `,
      navbar: `
        .goog-te-combo {
          background-color: hsl(var(--nextui-default-100)) !important;
          border: 1px solid hsl(var(--nextui-default-200)) !important;
          border-radius: 12px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
          color: hsl(var(--nextui-default-700)) !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.25s ease !important;
          min-width: 120px !important;
          height: 40px !important;
          font-weight: 500 !important;
        }
        
        .goog-te-combo:hover {
          background-color: hsl(var(--nextui-default-200)) !important;
          border-color: hsl(var(--nextui-primary-300)) !important;
          scale: 1.05 !important;
        }
        
        .goog-te-combo:focus {
          background-color: hsl(var(--nextui-default-100)) !important;
          border-color: hsl(var(--nextui-primary)) !important;
          box-shadow: 0 0 0 2px hsl(var(--nextui-primary) / 0.2) !important;
        }
        
        .goog-te-combo option {
          background-color: hsl(var(--nextui-content1)) !important;
          color: hsl(var(--nextui-default-700)) !important;
          padding: 8px !important;
        }
        
        .goog-te-menu-value:before {
          content: '🌐' !important;
          margin-right: 8px !important;
          font-size: 16px !important;
        }
      `,
      minimal: `
        .goog-te-combo {
          background-color: transparent !important;
          border: 1px solid #d1d5db !important;
          border-radius: 4px !important;
          padding: 4px 8px !important;
          font-size: 12px !important;
          color: #6b7280 !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          min-width: 90px !important;
        }
        
        .goog-te-combo:hover {
          border-color: #9ca3af !important;
          color: #374151 !important;
        }
        
        .goog-te-combo:focus {
          border-color: #6b7280 !important;
          color: #111827 !important;
        }
      `,
    };

    return baseStyles + variantStyles[variant];
  };

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: getVariantStyles() }} />
      </Head>

      <div className={`google-translate-container ${className}`}>
        <div id="google_translate_element"></div>

        {showLabel && isLoaded && userCountryLanguage && !compact && (
          <div
            style={{
              marginTop: variant === "minimal" ? "4px" : "6px",
              fontSize: variant === "minimal" ? "10px" : "11px",
              color:
                variant === "navbar"
                  ? "hsl(var(--nextui-default-500))"
                  : "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
          >
            <span>
              EN •{" "}
              {languageNames[userCountryLanguage] ||
                userCountryLanguage.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleTranslate;
