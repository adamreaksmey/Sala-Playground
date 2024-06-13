type LessonCountType = (
  lessons: any,
  ids?: Set<unknown>
) => Promise<{
  countAll: number
  ids: unknown[]
}>

type TreeDeleteType = (tree: any, idToDelete: any) => any

/**
 * Recursive function to get lesson children
 * @param {*} lessons
 * @param {*} ids
 * @returns
 */
export const calculateLessonCount: LessonCountType = async (
  lessons: any,
  ids = new Set()
) => {
  let countAll = 0

  for (const lesson of lessons) {
    if (lesson.children && lesson.children.length > 0) {
      // if lesson/activity has children, we count the progress of its child instead
      const { countAll: childCount } = await calculateLessonCount(lesson.children, ids)
      countAll += childCount
    } else if (lesson.type == 'lesson' || lesson.type == 'certification') {
      // for empty lesson
    } else {
      ids.add(lesson.id)
      countAll++
    }
  }

  return { countAll, ids: Array.from(ids) }
}

/**
 * Recursive function to count only if lesson is reflection.
 * @param {*} lessons
 * @param {*} ids
 * @returns
 */
export const calculateLessonCountBasedOnQA: LessonCountType = async (
  lessons,
  ids = new Set()
) => {
  let countAll = 0

  for (const lesson of lessons) {
    if (lesson.children && lesson.children.length > 0) {
      // if lesson/activity has children, we count the progress of its child instead
      const { countAll: childCount } = await calculateLessonCountBasedOnQA(
        lesson.children,
        ids
      )
      countAll += childCount
    } else if (lesson.type == 'lesson' || lesson.type == 'certification') {
      // for empty lesson
    } else {
      if (lesson.questionId) {
        ids.add(lesson.id)
      }
      countAll++
    }
  }

  return { countAll, ids: Array.from(ids) }
}

/**
 * Deletes a lesson based on given activityId.
 * @param {*} tree
 * @param {*} idToDelete
 * @returns
 */
export const searchDelete: TreeDeleteType = (tree, idToDelete) => {
  let cleanTree: any = tree.filter((el: any) => el.id != idToDelete)
  for (let i = 0; i < cleanTree.length; i++) {
    if (cleanTree[i].children && cleanTree[i].children.length > 0) {
      cleanTree[i].children = searchDelete(cleanTree[i].children, idToDelete)
    }
  }
  return cleanTree
}
