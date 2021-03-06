require 'test_helper'

class DoctorsControllerTest < ActionController::TestCase
  setup do
    @doctor = doctors(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:doctors)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create doctor" do
    assert_difference('Doctor.count') do
      post :create, doctor: { city: @doctor.city, first_name: @doctor.first_name, last_name: @doctor.last_name, phone: @doctor.phone, specialty: @doctor.specialty, state: @doctor.state, street: @doctor.street, unit: @doctor.unit, zip: @doctor.zip }
    end

    assert_redirected_to doctor_path(assigns(:doctor))
  end

  test "should show doctor" do
    get :show, id: @doctor
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @doctor
    assert_response :success
  end

  test "should update doctor" do
    patch :update, id: @doctor, doctor: { city: @doctor.city, first_name: @doctor.first_name, last_name: @doctor.last_name, phone: @doctor.phone, specialty: @doctor.specialty, state: @doctor.state, street: @doctor.street, unit: @doctor.unit, zip: @doctor.zip }
    assert_redirected_to doctor_path(assigns(:doctor))
  end

  test "should destroy doctor" do
    assert_difference('Doctor.count', -1) do
      delete :destroy, id: @doctor
    end

    assert_redirected_to doctors_path
  end
end
