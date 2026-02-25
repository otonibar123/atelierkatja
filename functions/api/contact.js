export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { name, email, brand, type, message } = await request.json();

        if (!name || !email || !type || !message) {
            return json({ error: 'Missing required fields' }, 400);
        }

        const typeLabels = {
            'brand-partnership': 'Brand partnership',
            'sponsored-content': 'Sponsored content',
            'pr-gifting':        'PR gifting',
            'ambassador':        'Ambassador program',
            'event':             'Event / Workshop',
            'other':             'Other',
        };

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify({
                from:     'Atelier Katja <contact@atelierkatja.com>',
                to:       'contact@atelierkatja.com',
                reply_to: email,
                subject:  `Partnership — ${brand || name}`,
                html: `
                    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#2C1810">
                        <h2 style="color:#3E2723;border-bottom:2px solid #C8956C;padding-bottom:12px">
                            New partnership inquiry
                        </h2>
                        <table style="width:100%;border-collapse:collapse">
                            <tr>
                                <td style="padding:8px 0;font-weight:600;width:110px;color:#6D4C41">Name</td>
                                <td style="padding:8px 0">${esc(name)}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px 0;font-weight:600;color:#6D4C41">Email</td>
                                <td style="padding:8px 0">
                                    <a href="mailto:${esc(email)}" style="color:#C8956C">${esc(email)}</a>
                                </td>
                            </tr>
                            ${brand ? `
                            <tr>
                                <td style="padding:8px 0;font-weight:600;color:#6D4C41">Brand</td>
                                <td style="padding:8px 0">${esc(brand)}</td>
                            </tr>` : ''}
                            <tr>
                                <td style="padding:8px 0;font-weight:600;color:#6D4C41">Type</td>
                                <td style="padding:8px 0">${esc(typeLabels[type] || type)}</td>
                            </tr>
                        </table>
                        <div style="margin-top:24px;background:#FDF6EC;border-left:3px solid #C8956C;padding:16px 20px;border-radius:4px">
                            <p style="margin:0;white-space:pre-wrap">${esc(message)}</p>
                        </div>
                        <p style="margin-top:24px;font-size:12px;color:#9E9E9E">
                            Hit Reply to respond directly to ${esc(email)}
                        </p>
                    </div>
                `,
            }),
        });

        if (res.ok) return json({ ok: true }, 200);

        const err = await res.json().catch(() => ({}));
        console.error('Resend error:', err);
        return json({ error: 'Failed to send email' }, 500);

    } catch (err) {
        console.error('Function error:', err);
        return json({ error: 'Server error' }, 500);
    }
}

function json(data, status) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

function esc(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
