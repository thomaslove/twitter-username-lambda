module.exports = function(grunt) {
  grunt.initConfig({
    lambda_invoke: {
      default: {
        options: {
        }
      }
    },
    lambda_deploy: {
        default: {
            arn: 'arn:aws:lambda:eu-west-1:207111898004:function:twitter-username-lambda',
            options: {
              enableVersioning: true,
              region: 'us-west-2'
            }
        }
    },
    lambda_package: {
        default: {
        }
    }
  });

  grunt.loadNpmTasks('grunt-aws-lambda');

  grunt.registerTask('default', ['lambda_invoke']);
  grunt.registerTask('package', ['lambda_package']);
  grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy:default']);
}
