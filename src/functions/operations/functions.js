/**
 * Checks if value is valid uuid
 * @param {*} value
 * @returns
 */
export const isUUID = (value) => {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUUID = uuidPattern.test(value);
  if (isUUID) return value;
  //   return "b740450d-a05d-4e1d-a235-1d507702f30d";
};

/**
 * Recursive function to get lesson children
 * @param {*} lessons
 * @param {*} ids
 * @returns
 */
export const calculateLessonCount = async (lessons, ids = new Set()) => {
  let countAll = 0;

  for (const lesson of lessons) {
    if (lesson.children && lesson.children.length > 0) {
      // if lesson/activity has children, we count the progress of its child instead
      const { countAll: childCount } = await calculateLessonCount(
        lesson.children,
        ids
      );
      countAll += childCount;
    } else if (lesson.type == "lesson" || lesson.type == "certification") {
      // for empty lesson
    } else {
      ids.add(lesson.id);
      countAll++;
    }
  }

  return { countAll, ids: Array.from(ids) };
};

/**
 * Recursive function to count only if lesson is reflection.
 * @param {*} lessons
 * @param {*} ids
 * @returns
 */
export const calculateLessonCountBasedOnQA = async (
  lessons,
  ids = new Set()
) => {
  let countAll = 0;

  for (const lesson of lessons) {
    if (lesson.children && lesson.children.length > 0) {
      // if lesson/activity has children, we count the progress of its child instead
      const { countAll: childCount } = await calculateLessonCountBasedOnQA(
        lesson.children,
        ids
      );
      countAll += childCount;
    } else if (lesson.type == "lesson" || lesson.type == "certification") {
      // for empty lesson
    } else {
      if (lesson.questionId) {
        ids.add(lesson.id);
      }
      countAll++;
    }
  }

  return { countAll, ids: Array.from(ids) };
};
