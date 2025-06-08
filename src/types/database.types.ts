export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          email: string | null
          bio: string | null
          phone: string | null
          avatar_url: string | null
          cover_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          email?: string | null
          bio?: string | null
          phone?: string | null
          avatar_url?: string | null
          cover_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          email?: string | null
          bio?: string | null
          phone?: string | null
          avatar_url?: string | null
          cover_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      doujinshi: {
        Row: {
          id: string
          title: string
          thumbnail: string
          page_total: number | null
          created_at: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          title: string
          thumbnail: string
          page_total?: number | null
          created_at?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          thumbnail?: string
          page_total?: number | null
          created_at?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doujinshi_uploaded_by_fkey"
            columns: ["uploaded_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      doujinshi_pages: {
        Row: {
          id: string
          doujinshi_id: string
          page_number: number
          page_url: string
          created_at: string
        }
        Insert: {
          id?: string
          doujinshi_id: string
          page_number: number
          page_url: string
          created_at?: string
        }
        Update: {
          id?: string
          doujinshi_id?: string
          page_number?: number
          page_url?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doujinshi_pages_doujinshi_id_fkey"
            columns: ["doujinshi_id"]
            referencedRelation: "doujinshi"
            referencedColumns: ["id"]
          }
        ]
      }
      user_likes: {
        Row: {
          user_id: string
          doujinshi_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          doujinshi_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          doujinshi_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_likes_doujinshi_id_fkey"
            columns: ["doujinshi_id"]
            referencedRelation: "doujinshi"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          id: string
          doujinshi_id: string
          user_id: string
          content: string
          is_edited: boolean
          is_deleted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          doujinshi_id: string
          user_id: string
          content: string
          is_edited?: boolean
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          doujinshi_id?: string
          user_id?: string
          content?: string
          is_edited?: boolean
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_doujinshi_id_fkey"
            columns: ["doujinshi_id"]
            referencedRelation: "doujinshi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      comment_closure: {
        Row: {
          ancestor_id: string
          descendant_id: string
          depth: number
        }
        Insert: {
          ancestor_id: string
          descendant_id: string
          depth: number
        }
        Update: {
          ancestor_id?: string
          descendant_id?: string
          depth?: number
        }
        Relationships: [
          {
            foreignKeyName: "comment_closure_ancestor_id_fkey"
            columns: ["ancestor_id"]
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_closure_descendant_id_fkey"
            columns: ["descendant_id"]
            referencedRelation: "comments"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_root_comment: {
        Args: {
          p_doujinshi_id: string
          p_content: string
        }
        Returns: string
      }
      insert_reply_comment: {
        Args: {
          p_parent_id: string
          p_content: string
        }
        Returns: string
      }
      get_comment_thread: {
        Args: {
          p_doujinshi_id: string
        }
        Returns: {
          comment_id: string
          user_id: string
          username: string | null
          avatar_url: string | null
          content: string
          is_edited: boolean
          created_at: string
          updated_at: string
          depth: number
          parent_id: string | null
        }[]
      }
      get_comment_replies: {
        Args: {
          p_comment_id: string
        }
        Returns: {
          comment_id: string
          user_id: string
          username: string | null
          avatar_url: string | null
          content: string
          is_edited: boolean
          created_at: string
          updated_at: string
        }[]
      }
      get_comment_count: {
        Args: {
          p_doujinshi_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}