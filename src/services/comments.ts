import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/types/database.types";

type CommentThread = Database["public"]["Functions"]["get_comment_thread"]["Returns"][0];
type CommentReply = Database["public"]["Functions"]["get_comment_replies"]["Returns"][0];

export class CommentsService {
  private supabase = createClient();

  /**
   * Get all comments for a doujinshi in a hierarchical structure
   */
  async getCommentThread(doujinshiId: string): Promise<CommentThread[]> {
    const { data, error } = await this.supabase
      .rpc("get_comment_thread", { p_doujinshi_id: doujinshiId });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get direct replies to a specific comment
   */
  async getCommentReplies(commentId: string): Promise<CommentReply[]> {
    const { data, error } = await this.supabase
      .rpc("get_comment_replies", { p_comment_id: commentId });

    if (error) throw error;
    return data || [];
  }

  /**
   * Get comment count for a doujinshi
   */
  async getCommentCount(doujinshiId: string): Promise<number> {
    const { data, error } = await this.supabase
      .rpc("get_comment_count", { p_doujinshi_id: doujinshiId });

    if (error) throw error;
    return data || 0;
  }

  /**
   * Add a new root comment
   */
  async addRootComment(doujinshiId: string, content: string): Promise<string> {
    const { data, error } = await this.supabase
      .rpc("insert_root_comment", {
        p_doujinshi_id: doujinshiId,
        p_content: content
      });

    if (error) throw error;
    return data;
  }

  /**
   * Add a reply to an existing comment
   */
  async addReplyComment(parentId: string, content: string): Promise<string> {
    const { data, error } = await this.supabase
      .rpc("insert_reply_comment", {
        p_parent_id: parentId,
        p_content: content
      });

    if (error) throw error;
    return data;
  }

  /**
   * Update a comment's content
   */
  async updateComment(commentId: string, content: string): Promise<void> {
    const { error } = await this.supabase
      .from("comments")
      .update({ content, is_edited: true })
      .eq("id", commentId);

    if (error) throw error;
  }

  /**
   * Soft delete a comment
   */
  async deleteComment(commentId: string): Promise<void> {
    const { error } = await this.supabase
      .from("comments")
      .update({ is_deleted: true })
      .eq("id", commentId);

    if (error) throw error;
  }

  /**
   * Build a tree structure from flat comment list
   */
  buildCommentTree(comments: CommentThread[]): CommentTreeNode[] {
    const commentMap = new Map<string, CommentTreeNode>();
    const rootComments: CommentTreeNode[] = [];

    // First pass: create all nodes
    comments.forEach(comment => {
      commentMap.set(comment.comment_id, {
        ...comment,
        children: []
      });
    });

    // Second pass: build the tree
    comments.forEach(comment => {
      const node = commentMap.get(comment.comment_id)!;
      
      if (comment.parent_id === null) {
        rootComments.push(node);
      } else {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return rootComments;
  }
}

export interface CommentTreeNode extends CommentThread {
  children: CommentTreeNode[];
}

// Export singleton instance
export const commentsService = new CommentsService();