class Doctor < ActiveRecord::Base
  geocoded_by :full_address
  after_validation :geocode
  
  def full_address
    "#{street_address}, #{city}, #{state} #{zip}"
  end

  def street_address
    unit.blank? ? street : "#{street} #{unit}"
  end
end
