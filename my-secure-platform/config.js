// إعدادات الاتصال بالسيرفر - محمي ومفصول
const CONFIG = {
    URL: 'https://hiovpexzwvmjkhkmuavw.supabase.co',
    KEY: 'sb_publishable_EG0oy3HqpJc-MXrFfbDX4w_wY_cwIFp'
};

// إنشاء العميل مرة واحدة وتصديره
const _supabase = supabase.createClient(CONFIG.URL, CONFIG.KEY);