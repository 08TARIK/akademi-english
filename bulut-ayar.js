/* Supabase bağlantısı (BULUT-KURULUM.md). Bu anahtar herkese açık "publishable" anahtardır;
   güvenliği supabase/schema.sql'deki satır düzeyi kurallar sağlar. service_role / secret anahtar ASLA buraya konmaz. */
window.ACADEMY_CLOUD = window.ACADEMY_CLOUD || {
  url: "https://rffenfjrvjowjscujfwy.supabase.co",
  anonKey: "sb_publishable_0860DYh0lkaF0TgAkaivcA_UMvIFF9x"
};

/* Web Push: genel (gizli olmayan) VAPID anahtarı. Özel anahtar yalnız Supabase Edge Function sırlarında durur. */
window.ACADEMY_PUSH = window.ACADEMY_PUSH || { vapid: "BD86TaQU8MdzD6ETDrS5ZG-H38UC4di8lLdNwO8wHlHpLPRaW9BJlMGbrDV01M6fzy8JaatNYnsAIEWYsFgpL9Q" };
