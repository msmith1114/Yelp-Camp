//All Middle Goes methodOverride
const Campground = require('../models/campground')
const Comment = require('../models/comment')

const middlewareObj = {}

  middlewareObj.checkCommentOwnership = function(req, res, next) {
      if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
          if (err || !foundComment) {
            req.flash('error', 'Comment not found..')
            res.redirect('back')
          } else {
            if (req.user && foundComment.author.id.equals(req.user._id)) {
              next()
            } else {
              req.flash('error', 'You don\'t have permission..')
              res.redirect('back')
            }
          }
        })
      } else {
        req.flash('error', 'You need to be logged in...')
        res.redirect('back')
      }
    }


  middlewareObj.checkCampgroundOwnership = function(req, res, next) {
      if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
          if (err || !foundCampground) {
            req.flash('error', 'Campground not found...')
            res.redirect('back')
          } else {
            if (req.user && foundCampground.author.id.equals(req.user._id)) {
              next()
            } else {
              req.flash('error', 'You don\'t have permissions..')
              res.redirect('back')
            }
          }
        })
      } else {
        req.flash('error', 'You need to be logged in...')
        res.redirect('back')
      }
    }

    middlewareObj.isLoggedIn = function(req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      req.flash('error', 'You need to be logged in...')
      res.redirect('/login')
    }




module.exports = middlewareObj;
