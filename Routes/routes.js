const recipeController=require('../Controllers/recipeController')
const userController=require('../Controllers/userController')
const downloadController=require('../Controllers/downloadController')
const savedRecipeController=require('../Controllers/savedRecipeController')
const feedbackController=require('../Controllers/feedbackController')

const jwtMiddle=require('../Middleware/jwtMiddleware')
const adminJwtMiddle=require('../Middleware/adminJwtMiddleware')

const express=require('express')
const router=express.Router()

//Authentification
router.post('/signup',userController.userSignUp)
router.post('/signin',userController.signIn)

//feedbacks
router.post('/addfeedback',feedbackController.addFeedback)
router.get('/getfeedbacks',feedbackController.allFeedbacks)

//[USER]
router.patch('/profile-update',jwtMiddle,userController.profileUpdate)

//Recipes
router.get('/all-recipes',recipeController.getAllRecipes)
router.get('/get-recipe/:id',jwtMiddle,recipeController.getRecipeById)

//Downloads
router.post('/add-download/:rid',jwtMiddle,downloadController.addRecipeDownload)
router.get('/get-downloads',jwtMiddle,downloadController.getDownloadedRecipe)

//Saved recipes
router.post('/save-recipe/:rid',jwtMiddle,savedRecipeController.addSavedRecipe)
router.get('/get-savedrecipe',jwtMiddle,savedRecipeController.getSavedRecipe)
router.delete('/delete-savedrecipe/:srid',jwtMiddle,savedRecipeController.deleteSavedRecipe)

//[ADMIN]
router.post('/admin/addrecipe',adminJwtMiddle,recipeController.addRecipe)
router.put('/admin/update-recipe/:rid',adminJwtMiddle,recipeController.editRecipe)
router.delete('/admin/delete-recipe/:rid',adminJwtMiddle,recipeController.deleteRecipe)
router.get('/admin/allrecipes',adminJwtMiddle,recipeController.getAllRecipes)
router.get('/admin/allfeedbacks',adminJwtMiddle,feedbackController.allFeedbacks)
router.get('/admin/users',adminJwtMiddle,userController.allUsers)
router.delete('/admin/deletefeedback/:fid',adminJwtMiddle,feedbackController.deleteFeedback)

module.exports=router