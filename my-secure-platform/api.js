// دالة لجلب IP المستخدم الحالي
async function getUserIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// دالة فحص الصلاحية والدخول من جهاز واحد فقط
async function checkSecurityAccess(userId) {
    const currentIP = await getUserIP();
    
    // جلب الـ IP المخزن للمستخدم من جدول Profiles
    const { data, error } = await _supabase
        .from('profiles')
        .select('registered_ip')
        .eq('id', userId)
        .single();

    if (data.registered_ip === null) {
        // إذا كان أول دخول، قم بتخزين الـ IP الحالي كبصمة للجهاز
        await _supabase.from('profiles').update({ registered_ip: currentIP }).eq('id', userId);
        return true;
    } else if (data.registered_ip !== currentIP) {
        // إذا كان الـ IP مختلف، امنعه من الدخول
        alert("تنبيه أمني: لا يمكنك الدخول إلا من جهازك المسجل مسبقاً.");
        await _supabase.auth.signOut();
        window.location.href = 'login.html';
        return false;
    }
    return true;
}