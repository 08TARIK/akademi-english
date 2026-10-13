/* Supabase bağlantısı (BULUT-KURULUM.md). Bu anahtar herkese açık "publishable" anahtardır;
   güvenliği supabase/schema.sql'deki satır düzeyi kurallar sağlar. service_role / secret anahtar ASLA buraya konmaz. */
window.ACADEMY_CLOUD = window.ACADEMY_CLOUD || {
  url: "https://rffenfjrvjowjscujfwy.supabase.co",
  anonKey: "sb_publishable_0860DYh0lkaF0TgAkaivcA_UMvIFF9x"
};

/* Web Push: genel (gizli olmayan) VAPID anahtarı. Özel anahtar yalnız Supabase Edge Function sırlarında durur. */
window.ACADEMY_PUSH = window.ACADEMY_PUSH || { vapid: "BHFu3Mrmq0tXD3EwU8QwfqdAiUMtAqmYReDcVdIFfICa-H7Mr8hADD54WPI0lUE8xNmndhQzWGKS419-VSFyetg" };
