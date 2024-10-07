// supabase/functions/createClasses.ts
import { serve } from 'std/server';

serve(async (req) => {
    const response = await fetch('https://epmyfwdbpduyubkeqvkf.supabase.co/rest/v1/rpc/create_classes', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return new Response('Classes created successfully', { status: 200 });
    } else {
        return new Response('Error creating classes', { status: response.status });
    }
});
