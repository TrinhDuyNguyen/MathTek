export enum ERouteTable {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  VERIFY_OTP = '/verify-otp',
  RESET_PASSWORD = '/reset-password',
  FORGOT_PASSWORD = '/forgot-password',
  UPDATE_PASSWORD = '/update-password',

  ABOUT = '/about',
  CONTACT = '/contact',
  FAQ_PAGE = '/faq',

  CHALLENGE_QUIZ = '/challenges/quizz',
  CHALLENGE_FILL_STORY = '/challenges/fill-story',
  CHALLENGE_PUZZLE = '/challenges/puzzle-heroes',
  CHALLENGE_TIMELINE = '/challenges/timeline',

  COURSE = '/courses',
  COURSE_DETAIL = '/course/:id',
  COURSE_REGISTER = '/course/register',
  COURSE_FAVORITE = '/course/favorite',
  PROFILE = '/profile',
  DASHBOARD = '/dashboard',

  ADMIN = '/admin',
}
