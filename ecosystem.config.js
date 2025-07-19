module.exports = {
  apps: [{
    name: 'blox',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/opt/blox',
    env_file: '/opt/blox/.env.production',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: 'https://hcyctvbevgbfkhukwqnp.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeWN0dmJldmdiZmtodWt3cW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MDU3MDMsImV4cCI6MjA2ODI4MTcwM30.ljpFm8Qcb9YRviOQLRiGkHtOfVpqqQRIUhojjrBcNAY',
      NEXT_PUBLIC_SITE_URL: 'http://3.137.178.229',
      N8N_AGENT_URL: 'http://3.137.178.229',
      BRAVE_SEARCH_API_KEY: 'BSAh4rcEMDMWlFPpyVPsSyX-p9lwF1o',
      OPENAI_API_KEY: ''
    }
  }]
}
