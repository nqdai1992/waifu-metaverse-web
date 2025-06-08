# Supabase Database Setup

This directory contains the database schema and configuration for the Waifu project.

## Local Development Setup

1. **Start Supabase locally:**
   ```bash
   supabase start
   ```

2. **Apply migrations:**
   The migrations will be automatically applied when you start Supabase. If you need to reset the database:
   ```bash
   supabase db reset
   ```

3. **Access Supabase Studio:**
   Open http://localhost:54323 to access the local Supabase Studio.

## Database Schema

The database includes the following tables:

- **profiles**: User profile information (extends auth.users)
- **doujinshi**: Main content table for doujinshi entries
- **doujinshi_pages**: Individual pages for each doujinshi
- **user_likes**: Many-to-many relationship for user likes
- **comments**: User comments on doujinshi
- **comment_closure**: Closure table for hierarchical comment relationships

### Comment System

The comment system uses the Closure Table pattern for efficient hierarchical comment storage and retrieval:

- Supports unlimited nesting depth
- Efficient queries for entire comment threads
- Easy retrieval of direct replies
- Maintains referential integrity

Available functions:
- `insert_root_comment(doujinshi_id, content)`: Add a new top-level comment
- `insert_reply_comment(parent_id, content)`: Reply to an existing comment
- `get_comment_thread(doujinshi_id)`: Get all comments for a doujinshi
- `get_comment_replies(comment_id)`: Get direct replies to a comment
- `get_comment_count(doujinshi_id)`: Get total comment count

## Generating TypeScript Types

To update TypeScript types after schema changes:

1. Install the Supabase CLI globally (if not already installed)
2. Run the following command:
   ```bash
   supabase gen types typescript --local > src/types/database.types.ts
   ```

## Seed Data

The `seed.sql` file contains sample data for development, including:
- A test user (email: test@example.com, password: password123)
- Sample doujinshi entries
- Sample likes

## Migrations

New migrations should be added to the `migrations` directory with the naming convention:
`YYYYMMDD_description.sql`

## Remote Database

To connect to a remote Supabase project:

1. Link your project:
   ```bash
   supabase link --project-ref <your-project-ref>
   ```

2. Push migrations:
   ```bash
   supabase db push
   ```

3. Generate types from remote:
   ```bash
   supabase gen types typescript --project-id <your-project-ref> > src/types/database.types.ts
   ```