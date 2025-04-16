enum EUserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
  UNACTIVE = "UNACTIVE",
}

enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}
enum ECourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

enum ECourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCE = "ADVANCE",
}

enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}
export { EUserStatus, EUserRole, ECourseStatus, ECourseLevel, ELessonType };
