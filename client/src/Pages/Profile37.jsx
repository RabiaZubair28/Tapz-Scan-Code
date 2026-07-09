import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  FaCheckCircle,
  FaChevronRight,
  FaEnvelope,
  FaGoogle,
  FaHeart,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaQuoteLeft,
  FaRegStar,
  FaStar,
  FaUserPlus,
  FaWhatsapp,
} from "react-icons/fa";

const BRAND = {
  burgundy: "#8d061c",
  burgundyDark: "#690316",
  cream: "#fff8ef",
  creamSoft: "#fffdf8",
  gold: "#d9aa62",
  goldSoft: "#f3dec1",
  text: "#5d0618",
  muted: "#8d8178",
  border: "#ead9c9",
};

const cleanText = (value = "") =>
  String(value || "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();

const normalizeWhatsApp = (value = "") => String(value || "").replace(/[^0-9]/g, "");

const displayValue = (value, fallback = "") => cleanText(value) || fallback;

const DividerTitle = ({ children }) => (
  <div className="mt-6 mb-4 flex items-center gap-3">
    <span className="h-px flex-1 bg-[#e8cda7]" />
    <FaRegStar className="text-[#d9aa62]" size={11} />
    <span className="font-serif text-[12px] font-bold uppercase tracking-[0.10em] text-[#7b1223]">
      {children}
    </span>
    <FaRegStar className="text-[#d9aa62]" size={11} />
    <span className="h-px flex-1 bg-[#e8cda7]" />
  </div>
);

const ContactRow = ({ icon, label, value, href }) => {
  if (!value) return null;

  const content = (
    <div className="flex w-full items-center justify-between gap-3 border-b border-[#ead9c9] px-4 py-3 last:border-b-0 transition-all duration-200 hover:bg-[#fff5e9]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#8d061c] text-white shadow-[0_5px_12px_rgba(141,6,28,0.24)]">
          {icon}
        </div>
        <span className="font-serif text-[13px] font-semibold text-[#3c3130]">
          {label}
        </span>
      </div>
      <div className="flex min-w-0 items-center gap-3 text-right">
        <span className="truncate text-[12px] font-medium text-[#a04555]">{value}</span>
        <FaChevronRight className="shrink-0 text-[#7b1223]" size={13} />
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  );
};

const Profile37 = () => {
  const { id: clientId } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`https://www.scan-taps.com/api/data/client/${clientId}`);
        setClient(response.data);
      } catch (err) {
        setClient(null);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    } else {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      if (!client?._id) return;

      try {
        const incrementResponse = await axios.post(`https://www.scan-taps.com/api/visit/${client._id}`);
        setVisitCount(incrementResponse.data.count || 0);
      } catch (error) {
        console.error("Error fetching or incrementing visit count:", error);
      }
    };

    fetchAndIncrementVisitCount();
  }, [client?._id]);

  const {
    companyName,
    name,
    description,
    phone01,
    telephone01,
    clientName,
    designation,
    address,
    whatsapp01,
    location,
    googleReviewLink,
    googleReviewName,
    website,
    email,
    googleMapLink,
    googleMapName,
    logo,
    images,
  } = client || {};

  const brandName = displayValue(name || companyName, "Starlink");
  const personName = displayValue(clientName, "Mohammed Al Rashidi");
  const roleName = displayValue(designation, "Technology Advisor");
  const locationLabel = displayValue(address || googleMapName || location, `${brandName} Aspire Store`);
  const profileImage = logo || images;
  const phoneValue = displayValue(phone01 || telephone01);
  const whatsappValue = displayValue(whatsapp01);
  const emailValue = displayValue(email);
  const reviewLabel = displayValue(googleReviewName, "Share us your Google review");
  const whatsappNumber = normalizeWhatsApp(whatsapp01);
  const quoteText =
    displayValue(description) ||
    `Thank you for visiting ${brandName}.\nI'm here whenever you need technology advice.`;

  const downloadContactCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${personName};;;\nFN:${personName}\nORG:${brandName}\nTITLE:${roleName}\nTEL;TYPE=CELL:${phoneValue}\nEMAIL;HOME:${emailValue}\nURL:${website || ""}\nEND:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = url;
    } else {
      const newLink = document.createElement("a");
      newLink.download = `${personName}.vcf`;
      newLink.href = url;
      newLink.click();
    }

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff8ef]">
        <ScaleLoader color={BRAND.burgundy} size={50} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff8ef] px-5 text-center">
        <div className="max-w-sm rounded-[28px] border border-[#ead9c9] bg-white px-7 py-8 shadow-lg">
          <h1 className="font-serif text-3xl font-bold text-[#5d0618]">Profile not found</h1>
          <p className="mt-3 text-[#8d8178]">Unable to load this digital profile.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#fbf4e9] px-3 py-5 sm:px-5">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{personName}</title>
        {profileImage ? <link rel="icon" type="image/x-icon" href={profileImage} /> : null}
        <meta name="description" content={roleName || brandName} />
        <meta property="og:title" content={personName} />
        <meta property="og:description" content={roleName || brandName} />
        <meta property="og:url" content={`https://www.scan-taps.com/${companyName || ""}`} />
        {profileImage ? <meta property="og:image" content={profileImage} /> : null}
        <meta name="twitter:title" content={personName} />
        <meta name="twitter:description" content={roleName || brandName} />
      </Helmet>

      <div className="mx-auto max-w-[430px] rounded-[30px] bg-white/45 p-[2px] shadow-[0_10px_28px_rgba(88,45,20,0.16)]">
        <article className="relative overflow-hidden rounded-[28px] border border-white bg-[#fffaf3] px-5 pb-7 pt-7 text-center shadow-[inset_0_0_0_1px_rgba(232,205,167,0.55)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_42%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(246,226,200,0.16))]" />

          <button
            type="button"
            onClick={downloadContactCard}
            className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-[10px] bg-[#8d061c] px-4 py-2.5 text-[15px] font-bold text-white shadow-[0_5px_12px_rgba(104,3,22,0.34)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#690316]"
          >
            <FaUserPlus size={19} />
            Save Contact
          </button>

          <div className="relative z-10 pt-16">
            <div className="mx-auto flex h-[128px] w-[128px] items-center justify-center rounded-full border-[3px] border-white bg-[#fff7ed] shadow-[0_0_0_3px_rgba(232,205,167,0.85),0_10px_24px_rgba(117,58,28,0.16)]">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={personName}
                  className="h-[116px] w-[116px] rounded-full object-cover"
                />
              ) : (
                <div className="flex h-[116px] w-[116px] items-center justify-center rounded-full bg-[#f1dfc9] font-serif text-5xl font-bold text-[#8d061c]">
                  {personName.charAt(0)}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <p className="font-serif text-[16px] font-bold text-[#8d061c]">{brandName}</p>
              <FaCheckCircle className="text-[#8d061c]" size={18} />
            </div>

            <h1 className="mt-3 font-serif text-[22px] font-bold leading-[1.03] tracking-[-0.04em] text-[#5d0618] sm:text-[44px]">
              {personName}
            </h1>

            <p className="mt-2 text-[16px] font-semibold text-[#8d8178]">{roleName}</p>

            {locationLabel ? (
              <a
                href={googleMapLink || undefined}
                target={googleMapLink ? "_blank" : undefined}
                rel={googleMapLink ? "noopener noreferrer" : undefined}
                className="mx-auto mt-1 flex max-w-full items-center justify-center gap-2 text-[16px] font-semibold text-[#3c3130]"
              >
                <FaMapMarkerAlt className="shrink-0 text-[#8d061c]" size={18} />
                <span className="truncate">{locationLabel}</span>
              </a>
            ) : null}

            <DividerTitle>Welcome</DividerTitle>

            <div className="rounded-[12px] border border-[#ead9c9] bg-[#fffdf8] px-4 py-5 text-center shadow-[0_5px_16px_rgba(106,57,28,0.12)]">
              <div className="flex items-start gap-2">
                <FaQuoteLeft className="mt-1 shrink-0 text-[#8d061c]" size={20} />
                <p className="w-full whitespace-pre-line font-serif text-[11px] font-medium leading-[1.35] text-[#3c3130]">
                  {quoteText}
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[14px] border border-[#ead9c9] bg-[#fffdf8] shadow-[0_4px_14px_rgba(106,57,28,0.1)]">
              <ContactRow
                icon={<FaPhoneAlt size={17} />}
                label="Call"
                value={phoneValue}
                href={phoneValue ? `tel:${phoneValue}` : undefined}
              />
              <ContactRow
                icon={<FaWhatsapp size={17} />}
                label="WhatsApp"
                value={whatsappValue}
                href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : undefined}
              />
              <ContactRow
                icon={<FaEnvelope size={17} />}
                label="Email"
                value={emailValue}
                href={emailValue ? `mailto:${emailValue}` : undefined}
              />
            </div>

            {googleReviewLink ? (
              <a
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-4 rounded-[16px] border border-[#ead9c9] bg-[#fff5e9] px-5 py-5 text-left shadow-[0_5px_16px_rgba(106,57,28,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_22px_rgba(106,57,28,0.18)]"
              >
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <FaStar className="absolute text-[#dfaa5e] drop-shadow" size={45} />
                  <FaStar className="absolute text-[#f8d28b]" size={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-[18px] font-bold leading-tight text-[#7b1223]">
                    Share us your Google Review
                  </h2>
                  <p className="mt-1 text-[12px] font-semibold leading-snug text-[#8d8178]">
                    Your feedback helps us improve and recognize great service.
                  </p>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_13px_rgba(80,55,30,0.16)]">
                  <FaGoogle size={25} className="text-[#4285f4]" />
                </div>
                <FaChevronRight className="shrink-0 text-[#7b1223]" size={22} />
              </a>
            ) : null}

            <div className="mt-6 mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#e8cda7]" />
              <FaRegStar className="text-[#d9aa62]" size={11} />
              <span className="h-px flex-1 bg-[#e8cda7]" />
            </div>

            <footer className="text-center">
              <p className="font-serif text-[16px] font-bold text-[#7b1223]">
                We appreciate your time and feedback.
              </p>
              <p className="text-[15px] font-semibold text-[#8d8178]">
                It helps us serve you better every day.
              </p>
              <FaHeart className="mx-auto mt-2 text-[#d9aa62]" size={25} />
              {visitCount ? (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#c7a77d]">
                  Visits {visitCount}
                </p>
              ) : null}
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Profile37;
