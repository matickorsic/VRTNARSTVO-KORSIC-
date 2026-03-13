import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nptcxgecayuakaqloujy.supabase.co';
const supabaseKey = 'sb_publishable_Q5VpvZ2hAnzKwSTq7ZnspA_nquLe2CN';

export const supabase = createClient(supabaseUrl, supabaseKey);