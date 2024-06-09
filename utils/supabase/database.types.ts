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
      Activity: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Category: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Event: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Keywords: {
        Row: {
          frequency: Json
          id: string
          words: string[]
        }
        Insert: {
          frequency: Json
          id?: string
          words: string[]
        }
        Update: {
          frequency?: Json
          id?: string
          words?: string[]
        }
        Relationships: []
      }
      Location: {
        Row: {
          city: string
          country: string
          id: string
          latitude: number
          longitude: number
        }
        Insert: {
          city: string
          country: string
          id?: string
          latitude: number
          longitude: number
        }
        Update: {
          city?: string
          country?: string
          id?: string
          latitude?: number
          longitude?: number
        }
        Relationships: []
      }
      MediaType: {
        Row: {
          id: string
          type: string
        }
        Insert: {
          id?: string
          type: string
        }
        Update: {
          id?: string
          type?: string
        }
        Relationships: []
      }
      Notification: {
        Row: {
          allow_email_notification: boolean
          allow_text_notification: boolean
          eligible: boolean
          id: string
          notification_message: string
          notification_method: string
          time_to_be_notified: string
        }
        Insert: {
          allow_email_notification: boolean
          allow_text_notification: boolean
          eligible: boolean
          id?: string
          notification_message: string
          notification_method: string
          time_to_be_notified: string
        }
        Update: {
          allow_email_notification?: boolean
          allow_text_notification?: boolean
          eligible?: boolean
          id?: string
          notification_message?: string
          notification_method?: string
          time_to_be_notified?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          activity_id: string
          category_id: string
          content: string
          created_at: string
          event_id: string
          id: string
          is_offensive: boolean
          is_visible: boolean
          keywords_id: string
          media_type_id: string
          sentiment_id: string
          tag_id: string | null
          user_id: string
        }
        Insert: {
          activity_id: string
          category_id: string
          content: string
          created_at?: string
          event_id: string
          id?: string
          is_offensive: boolean
          is_visible: boolean
          keywords_id: string
          media_type_id: string
          sentiment_id: string
          tag_id?: string | null
          user_id: string
        }
        Update: {
          activity_id?: string
          category_id?: string
          content?: string
          created_at?: string
          event_id?: string
          id?: string
          is_offensive?: boolean
          is_visible?: boolean
          keywords_id?: string
          media_type_id?: string
          sentiment_id?: string
          tag_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_Activity_id"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "Activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_Event_id"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "Event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_Keywords_id"
            columns: ["keywords_id"]
            isOneToOne: false
            referencedRelation: "Keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_MediaType_id"
            columns: ["media_type_id"]
            isOneToOne: false
            referencedRelation: "MediaType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_Post_Category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_Sentiment_id"
            columns: ["sentiment_id"]
            isOneToOne: false
            referencedRelation: "Sentiment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_Tag_id"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_User_Post"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Sentiment: {
        Row: {
          id: string
          type: number
        }
        Insert: {
          id?: string
          type: number
        }
        Update: {
          id?: string
          type?: number
        }
        Relationships: []
      }
      Tag: {
        Row: {
          bible_keyword: string[]
          country_keyword: string[]
          id: string
          name: string[]
        }
        Insert: {
          bible_keyword: string[]
          country_keyword: string[]
          id?: string
          name: string[]
        }
        Update: {
          bible_keyword?: string[]
          country_keyword?: string[]
          id?: string
          name?: string[]
        }
        Relationships: []
      }
      User: {
        Row: {
          affiliation: string[] | null
          avatar_url: string | null
          birth_year: string | null
          created_at: string
          display_name: string | null
          email: string
          gender: string | null
          id: string
          interest: string[] | null
          languages: string[] | null
          notification_id: string | null
          phone_number: string | null
          picture: string | null
          updated_at: string
          user_location_id: string | null
          user_type_id: string | null
          username: string | null
        }
        Insert: {
          affiliation?: string[] | null
          avatar_url?: string | null
          birth_year?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          gender?: string | null
          id?: string
          interest?: string[] | null
          languages?: string[] | null
          notification_id?: string | null
          phone_number?: string | null
          picture?: string | null
          updated_at?: string
          user_location_id?: string | null
          user_type_id?: string | null
          username?: string | null
        }
        Update: {
          affiliation?: string[] | null
          avatar_url?: string | null
          birth_year?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          gender?: string | null
          id?: string
          interest?: string[] | null
          languages?: string[] | null
          notification_id?: string | null
          phone_number?: string | null
          picture?: string | null
          updated_at?: string
          user_location_id?: string | null
          user_type_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_Location_id"
            columns: ["user_location_id"]
            isOneToOne: false
            referencedRelation: "Location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_Notification_id"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "Notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_UserType_id"
            columns: ["user_type_id"]
            isOneToOne: false
            referencedRelation: "UserType"
            referencedColumns: ["id"]
          },
        ]
      }
      UserType: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_filtered_user_in_map: {
        Args: {
          ne_latitude: number
          ne_longitude: number
          sw_latitude: number
          sw_longitude: number
        }
        Returns: {
          type: string
          properties: Json
          geometry: Json
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never