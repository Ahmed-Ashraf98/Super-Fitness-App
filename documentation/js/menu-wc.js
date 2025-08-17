'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@fitness-org/source documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AboutUsComponent.html" data-type="entity-link" >AboutUsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AccountFormComponent.html" data-type="entity-link" >AccountFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ActivityLevelComponent.html" data-type="entity-link" >ActivityLevelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AgeComponent.html" data-type="entity-link" >AgeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AuthPageComponent.html" data-type="entity-link" >AuthPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatbotFloatingComponent.html" data-type="entity-link" >ChatbotFloatingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatbotInputComponent.html" data-type="entity-link" >ChatbotInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChatbotWindowComponent.html" data-type="entity-link" >ChatbotWindowComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomCardComponent.html" data-type="entity-link" >CustomCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomSliderComponent.html" data-type="entity-link" >CustomSliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomTabComponent.html" data-type="entity-link" >CustomTabComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FitnessClassComponent.html" data-type="entity-link" >FitnessClassComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPassComponent.html" data-type="entity-link" >ForgetPassComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GenderComponent.html" data-type="entity-link" >GenderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GoalComponent.html" data-type="entity-link" >GoalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthyNutriComponent.html" data-type="entity-link" >HealthyNutriComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeightComponent.html" data-type="entity-link" >HeightComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeroComponent.html" data-type="entity-link" >HeroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HorizonbarComponent.html" data-type="entity-link" >HorizonbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MessageCardComponent.html" data-type="entity-link" >MessageCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent.html" data-type="entity-link" >NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SingleClassComponent.html" data-type="entity-link" >SingleClassComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SingleMealComponent.html" data-type="entity-link" >SingleMealComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserProfileComponent.html" data-type="entity-link" >UserProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WeightComponent.html" data-type="entity-link" >WeightComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WhyUsComponent.html" data-type="entity-link" >WhyUsComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiEndpoint.html" data-type="entity-link" >ApiEndpoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthAPI.html" data-type="entity-link" >AuthAPI</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthENDPOINT.html" data-type="entity-link" >AuthENDPOINT</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExerciseResApi.html" data-type="entity-link" >ExerciseResApi</a>
                            </li>
                            <li class="link">
                                <a href="classes/MusclesResApi.html" data-type="entity-link" >MusclesResApi</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthApiService.html" data-type="entity-link" >AuthApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthLoginAPIAdapter.html" data-type="entity-link" >AuthLoginAPIAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthRegisterAPIAdapter.html" data-type="entity-link" >AuthRegisterAPIAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatbotManagerService.html" data-type="entity-link" >ChatbotManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CookiesManagerService.html" data-type="entity-link" >CookiesManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExerciseAdapter.html" data-type="entity-link" >ExerciseAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExerciseService.html" data-type="entity-link" >ExerciseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FlowbiteService.html" data-type="entity-link" >FlowbiteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthyServiceService.html" data-type="entity-link" >HealthyServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MusclesAdapter.html" data-type="entity-link" >MusclesAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MusclesService.html" data-type="entity-link" >MusclesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeManagerService.html" data-type="entity-link" >ThemeManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslateManagerService.html" data-type="entity-link" >TranslateManagerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Adapter.html" data-type="entity-link" >Adapter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarouselResponsive.html" data-type="entity-link" >CarouselResponsive</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/changePassword.html" data-type="entity-link" >changePassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatbotState.html" data-type="entity-link" >ChatbotState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChatMessage.html" data-type="entity-link" >ChatMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CookiesCustomOptions.html" data-type="entity-link" >CookiesCustomOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Exercise.html" data-type="entity-link" >Exercise</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExerciseGroup.html" data-type="entity-link" >ExerciseGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForgetPassUser.html" data-type="entity-link" >ForgetPassUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRes.html" data-type="entity-link" >LoginRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/loginUser.html" data-type="entity-link" >loginUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MealDetails.html" data-type="entity-link" >MealDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meals.html" data-type="entity-link" >Meals</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Muscle.html" data-type="entity-link" >Muscle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MuscleGroupDetail.html" data-type="entity-link" >MuscleGroupDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MuscleGroupDetailResponse.html" data-type="entity-link" >MuscleGroupDetailResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/muscles.html" data-type="entity-link" >muscles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MusclesGroup.html" data-type="entity-link" >MusclesGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfileDataRes.html" data-type="entity-link" >ProfileDataRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterRes.html" data-type="entity-link" >RegisterRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/registerUser.html" data-type="entity-link" >registerUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPassUser.html" data-type="entity-link" >ResetPassUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/tabData.html" data-type="entity-link" >tabData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdateUserProfileData.html" data-type="entity-link" >UpdateUserProfileData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/userRoleRes.html" data-type="entity-link" >userRoleRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyCodeUser.html" data-type="entity-link" >VerifyCodeUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});