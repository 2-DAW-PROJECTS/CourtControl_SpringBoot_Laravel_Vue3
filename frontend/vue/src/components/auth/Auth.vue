<template>
    <div class="container" ref="container">
        <div class="imgBx">
            <img id="sportsImage" src="@/assets/auth/wallauth5.png" alt="Sports">
        </div>
        <div class="user signinBx">
            <div class="formBx">
                <form @submit.prevent="login">
                    <h2>Sign In</h2>
                    <input type="text" placeholder="Username" autocomplete="off" v-model="loginEmail">
                    <div class="password-container">
                        <input type="password" placeholder="Password" id="password" ref="password" v-model="loginPassword">
                        <i class="fas fa-eye toggle-password" @click="togglePasswordVisibility('password')"></i>
                    </div>
                    <input type="submit" value="Login">
                    <div class="divider">or</div>
                    <div class="social-login">
                        <div class="social-btn google" @click="loginWithGoogle">
                            <i class="fab fa-google"></i>
                        </div>
                        <div class="social-btn facebook" @click="loginWithFacebook">
                            <i class="fab fa-facebook-f"></i>
                        </div>
                        <div class="social-btn github" @click="loginWithGithub">
                            <i class="fab fa-github"></i>
                        </div>
                    </div>
                    <p class="signup">Register now! <a href="#" @click.prevent="toggleForm">Sign up.</a></p>
                </form>
            </div>
        </div>
        <div class="user signupBx">
            <div class="formBx">
                <form @submit.prevent="register">
                    <h2>Create an Account</h2>
                    <input type="text" placeholder="Username" autocomplete="off" v-model="registerName">
                    <input type="email" placeholder="Email Address" autocomplete="off" v-model="registerEmail">
                    <div class="password-container">
                        <input type="password" placeholder="Create Password" id="createPassword" ref="createPassword" v-model="registerPassword">
                        <i class="fas fa-eye toggle-password" @click="togglePasswordVisibility('createPassword')"></i>
                    </div>
                    <div class="password-container">
                        <input type="password" placeholder="Confirm Password" id="confirmPassword" ref="confirmPassword">
                        <i class="fas fa-eye toggle-password" @click="togglePasswordVisibility('confirmPassword')"></i>
                    </div>
                    <input type="submit" value="Sign Up">
                    <p class="signup">Already have an account? <a href="#" @click.prevent="toggleForm">Sign in.</a></p>
                </form>
            </div>
        </div>
    </div>
</template>
    <script>
    import axios from 'axios';

    export default {
        name: 'AuthPage',
        data() {
            return {
                isRegistering: false,
                loginEmail: '',
                loginPassword: '',
                registerName: '',
                registerEmail: '',
                registerPassword: ''
            };
        },
        methods: {
            toggleForm() {
                this.isRegistering = !this.isRegistering;
                const container = this.$refs.container;
                container.classList.toggle('active');
            },
            togglePasswordVisibility(inputId) {
                const input = this.$refs[inputId];
                const icon = input.nextElementSibling;
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            },
            loginWithGoogle() {
                // Implement Google login logic
                console.log('Google login clicked');
            },
            loginWithFacebook() {
                // Implement Facebook login logic
                console.log('Facebook login clicked');
            },
            loginWithGithub() {
                // Implement GitHub login logic
                console.log('GitHub login clicked');
            },
//                                                                                  //
//                                                                                  //
//                                                                                  //
//  //  //  //  HAY QUE IMPLEMENTARLO A TRAVES DEL STORE Y DEL SERVICE  //  //  //  //
//                                                                                  //
//                                                                                  //
//                                                                                  //
            async login() {
                try {
                    const response = await axios.post('/api/auth/login', {
                        email: this.loginEmail,
                        password: this.loginPassword
                    });
                    console.log('Login successful:', response.data);
                } catch (error) {
                    console.error('Error logging in:', error);
                }
            },//login
            async register() {
                try {
                    const response = await axios.post('/api/auth/register', {
                        name: this.registerName,
                        email: this.registerEmail,
                        password: this.registerPassword
                    });
                    console.log('Registration successful:', response.data);
                } catch (error) {
                    console.error('Error registering:', error);
                }
            }//register


        }//Methods
    };
    </script>

    <style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        .container {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }

        .imgBx {
            position: fixed;
            width: 75%;
            height: 100%;
            background: linear-gradient(45deg, #7367f0, #5e52e9);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        .imgBx::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
            z-index: 1;
        }

        .imgBx img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.9);
        }

        .user {
            position: absolute;
            top: 0;
            right: 0;
            width: 25%;
            height: 100%;
            background: transparent;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .formBx {
            position: relative;
            width: 100%;
            height: 100%;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .container .user .formBx h2 {
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .container .user .formBx input {
            width: 100%;
            padding: 12px 15px;
            background: rgba(245, 245, 245, 0.9);
            color: #333;
            border: 2px solid transparent;
            outline: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
            font-size: 14px;
            margin: 8px 0;
            letter-spacing: 1px;
            font-weight: 400;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .password-container {
            position: relative;
            width: 100%;
        }

        .password-container input {
            width: 100%;
            padding-right: 40px !important;
        }

        .toggle-password {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #666;
        }

        .container .user .formBx input:focus {
            border-color: #7367f0;
            background: #fff;
            box-shadow: 0 0 15px rgba(115, 103, 240, 0.15);
        }

        .container .user .formBx input[type="submit"] {
            max-width: 150px;
            background: linear-gradient(45deg, #7367f0, #5e52e9);
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1.5px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            margin-top: 15px;
        }

        .container .user .formBx input[type="submit"]:hover {
            background: linear-gradient(45deg, #5e52e9, #7367f0);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(115, 103, 240, 0.3);
        }

        .social-login {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .google {
            background: #DB4437;
        }

        .facebook {
            background: #4267B2;
        }

        .github {
            background: #333;
        }

        .social-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .divider {
            margin: 20px 0;
            text-align: center;
            position: relative;
        }

        .divider::before,
        .divider::after {
            content: "";
            position: absolute;
            top: 50%;
            width: 45%;
            height: 1px;
            background: #ddd;
        }

        .divider::before {
            left: 0;
        }

        .divider::after {
            right: 0;
        }

        .container .user .formBx .signup {
            margin-top: 20px;
            font-size: 13px;
            letter-spacing: 1px;
            color: #666;
            text-transform: uppercase;
            font-weight: 500;
        }

        .container .user .formBx .signup a {
            font-weight: 700;
            text-decoration: none;
            color: #7367f0;
            transition: all 0.3s ease;
        }

        .container .user .formBx .signup a:hover {
            color: #5e52e9;
        }

        .signupBx {
            transform: translateX(100%);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .container.active .signupBx {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }

        .container.active .signinBx {
            transform: translateX(100%);
            opacity: 0;
            visibility: hidden;
        }

        .formBx form {
            width: 100%;
            max-width: 300px;
        }

        @media (max-width: 768px) {
            .container {
                width: 100vw;
                height: 100vh;
            }
            
            .imgBx {
                display: none;
            }
            
            .user {
                width: 100%;
            }
            
            .formBx {
                padding: 20px;
            }
        }









    </style>