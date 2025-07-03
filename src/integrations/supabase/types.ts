export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          challenge_type: string
          created_at: string
          description: string
          examples: Json | null
          id: string
          scenario_id: string
          test_cases: Json | null
          title: string
          user_id: string
        }
        Insert: {
          challenge_type: string
          created_at?: string
          description: string
          examples?: Json | null
          id?: string
          scenario_id: string
          test_cases?: Json | null
          title: string
          user_id: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          description?: string
          examples?: Json | null
          id?: string
          scenario_id?: string
          test_cases?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      circle_members: {
        Row: {
          circle_id: string
          id: string
          joined_at: string | null
          user_id: string
        }
        Insert: {
          circle_id: string
          id?: string
          joined_at?: string | null
          user_id: string
        }
        Update: {
          circle_id?: string
          id?: string
          joined_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "circle_members_circle_id_fkey"
            columns: ["circle_id"]
            isOneToOne: false
            referencedRelation: "circles"
            referencedColumns: ["id"]
          },
        ]
      }
      circles: {
        Row: {
          created_at: string | null
          creator_id: string
          expires_at: string | null
          id: string
          invite_code: string
          is_temporary: boolean | null
          max_members: number | null
          name: string
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          expires_at?: string | null
          id?: string
          invite_code: string
          is_temporary?: boolean | null
          max_members?: number | null
          name: string
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          expires_at?: string | null
          id?: string
          invite_code?: string
          is_temporary?: boolean | null
          max_members?: number | null
          name?: string
        }
        Relationships: []
      }
      daily_topics: {
        Row: {
          active_date: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          topic_name: string
        }
        Insert: {
          active_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          topic_name: string
        }
        Update: {
          active_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          topic_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          concept_tags: string[] | null
          correct_answer: string | null
          created_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"] | null
          hints: string[] | null
          id: string
          max_score: number | null
          mcq_options: Json | null
          programming_language:
            | Database["public"]["Enums"]["programming_language"]
            | null
          question_number: number | null
          question_text: string
          question_type: Database["public"]["Enums"]["challenge_type"]
          quiz_session_id: string | null
          session_id: string
          solution_code: string | null
          test_cases: Json | null
        }
        Insert: {
          concept_tags?: string[] | null
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          hints?: string[] | null
          id?: string
          max_score?: number | null
          mcq_options?: Json | null
          programming_language?:
            | Database["public"]["Enums"]["programming_language"]
            | null
          question_number?: number | null
          question_text: string
          question_type: Database["public"]["Enums"]["challenge_type"]
          quiz_session_id?: string | null
          session_id: string
          solution_code?: string | null
          test_cases?: Json | null
        }
        Update: {
          concept_tags?: string[] | null
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"] | null
          hints?: string[] | null
          id?: string
          max_score?: number | null
          mcq_options?: Json | null
          programming_language?:
            | Database["public"]["Enums"]["programming_language"]
            | null
          question_number?: number | null
          question_text?: string
          question_type?: Database["public"]["Enums"]["challenge_type"]
          quiz_session_id?: string | null
          session_id?: string
          solution_code?: string | null
          test_cases?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_quiz_session_id_fkey"
            columns: ["quiz_session_id"]
            isOneToOne: false
            referencedRelation: "quiz_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_sessions: {
        Row: {
          challenge_type: Database["public"]["Enums"]["challenge_type"]
          completion_time: unknown | null
          correct_answers: number | null
          created_at: string | null
          current_question_index: number | null
          id: string
          is_completed: boolean | null
          max_possible_score: number | null
          questions_completed: number | null
          session_end: string | null
          session_start: string | null
          topic_name: string
          total_questions: number | null
          total_score: number | null
          user_id: string
        }
        Insert: {
          challenge_type: Database["public"]["Enums"]["challenge_type"]
          completion_time?: unknown | null
          correct_answers?: number | null
          created_at?: string | null
          current_question_index?: number | null
          id?: string
          is_completed?: boolean | null
          max_possible_score?: number | null
          questions_completed?: number | null
          session_end?: string | null
          session_start?: string | null
          topic_name: string
          total_questions?: number | null
          total_score?: number | null
          user_id: string
        }
        Update: {
          challenge_type?: Database["public"]["Enums"]["challenge_type"]
          completion_time?: unknown | null
          correct_answers?: number | null
          created_at?: string | null
          current_question_index?: number | null
          id?: string
          is_completed?: boolean | null
          max_possible_score?: number | null
          questions_completed?: number | null
          session_end?: string | null
          session_start?: string | null
          topic_name?: string
          total_questions?: number | null
          total_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      reminder_preferences: {
        Row: {
          created_at: string | null
          email_reminders_enabled: boolean | null
          id: string
          last_reminder_sent: string | null
          preferred_reminder_time: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_reminders_enabled?: boolean | null
          id?: string
          last_reminder_sent?: string | null
          preferred_reminder_time?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_reminders_enabled?: boolean | null
          id?: string
          last_reminder_sent?: string | null
          preferred_reminder_time?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          created_at: string
          id: string
          scenario_text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          scenario_text: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          scenario_text?: string
          user_id?: string
        }
        Relationships: []
      }
      user_answers: {
        Row: {
          answer_text: string | null
          attempt_number: number | null
          created_at: string | null
          execution_result: Json | null
          feedback: string | null
          id: string
          is_correct: boolean | null
          programming_language:
            | Database["public"]["Enums"]["programming_language"]
            | null
          question_id: string
          score_earned: number | null
          session_id: string
          user_id: string
        }
        Insert: {
          answer_text?: string | null
          attempt_number?: number | null
          created_at?: string | null
          execution_result?: Json | null
          feedback?: string | null
          id?: string
          is_correct?: boolean | null
          programming_language?:
            | Database["public"]["Enums"]["programming_language"]
            | null
          question_id: string
          score_earned?: number | null
          session_id: string
          user_id: string
        }
        Update: {
          answer_text?: string | null
          attempt_number?: number | null
          created_at?: string | null
          execution_result?: Json | null
          feedback?: string | null
          id?: string
          is_correct?: boolean | null
          programming_language?:
            | Database["public"]["Enums"]["programming_language"]
            | null
          question_id?: string
          score_earned?: number | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_attempts: {
        Row: {
          attempt_number: number
          challenge_id: string
          code_solution: string | null
          created_at: string
          feedback: string | null
          id: string
          is_correct: boolean | null
          language: string | null
          mcq_answer: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          attempt_number?: number
          challenge_id: string
          code_solution?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          is_correct?: boolean | null
          language?: string | null
          mcq_answer?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          attempt_number?: number
          challenge_id?: string
          code_solution?: string | null
          created_at?: string
          feedback?: string | null
          id?: string
          is_correct?: boolean | null
          language?: string | null
          mcq_answer?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_attempts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          achievements: Json | null
          created_at: string | null
          current_level: number | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          total_questions_solved: number | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          total_questions_solved?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievements?: Json | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          total_questions_solved?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          challenge_type: Database["public"]["Enums"]["challenge_type"]
          created_at: string | null
          current_question_id: string | null
          exit_count: number | null
          id: string
          is_active: boolean | null
          questions_completed: number | null
          scenario_text: string
          session_end: string | null
          session_start: string | null
          total_score: number | null
          user_id: string
        }
        Insert: {
          challenge_type: Database["public"]["Enums"]["challenge_type"]
          created_at?: string | null
          current_question_id?: string | null
          exit_count?: number | null
          id?: string
          is_active?: boolean | null
          questions_completed?: number | null
          scenario_text: string
          session_end?: string | null
          session_start?: string | null
          total_score?: number | null
          user_id: string
        }
        Update: {
          challenge_type?: Database["public"]["Enums"]["challenge_type"]
          created_at?: string | null
          current_question_id?: string | null
          exit_count?: number | null
          id?: string
          is_active?: boolean | null
          questions_completed?: number | null
          scenario_text?: string
          session_end?: string | null
          session_start?: string | null
          total_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_freeze_used: boolean | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_freeze_used?: boolean | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_freeze_used?: boolean | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invite_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      challenge_type: "coding" | "mcq"
      difficulty_level: "basic" | "intermediate" | "advanced"
      programming_language:
        | "javascript"
        | "python"
        | "java"
        | "cpp"
        | "c"
        | "go"
        | "rust"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      challenge_type: ["coding", "mcq"],
      difficulty_level: ["basic", "intermediate", "advanced"],
      programming_language: [
        "javascript",
        "python",
        "java",
        "cpp",
        "c",
        "go",
        "rust",
      ],
    },
  },
} as const
