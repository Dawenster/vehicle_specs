require 'csv'

task :import_vehicle => :environment do |t, args|
  vehicle_csvs = Dir['db/vehicles/*.csv']
  vehicle_csvs.each do |vehicle_csv|
    puts vehicle_csv
    CSV.foreach(vehicle_csv) do |row|
      vehicle = find_or_create_vehicle(row)
      major_section = find_or_create_major_section(vehicle, row)
      minor_section = find_or_create_minor_section(vehicle, major_section, row)
      spec = find_or_create_spec(vehicle, major_section, minor_section, row)
      selection = create_selection(spec, row) unless row[16].blank?
    end
  end
end

def find_or_create_vehicle(row)
  vehicle_name = row[0]
  vehicle = Vehicle.find_by_name(vehicle_name)
  if vehicle
    return vehicle
  else
    return Vehicle.create(
      :name => vehicle_name
    )
  end
end

def find_or_create_major_section(vehicle, row)
  name = row[1]
  major_section = vehicle.major_sections.where(:name => name)
  if major_section.any?
    return major_section.first
  else
    return MajorSection.create(
      :name => name,
      :vehicle => vehicle
    )
  end
end

def find_or_create_minor_section(vehicle, major_section, row)
  name = row[2]
  minor_section = major_section.minor_sections.where(:name => name)
  if minor_section.any?
    return minor_section.first
  else
    return MinorSection.create(
      :name => name,
      :vehicle => vehicle,
      :major_section => major_section
    )
  end
end

def find_or_create_spec(vehicle, major_section, minor_section, row)
  name = row[3]
  spec = minor_section.specs.where(:name => name)
  if spec.any?
    return spec.first
  else
    return Spec.create(
      :name => name,
      :spec_type => row[4],
      :description => row[5],
      :range_min => row[6],
      :range_max => row[7],
      :range_interval => row[8],
      :range_default => row[9],
      :unit_type => row[10],
      :unit_of_measure => row[11],
      :uom_abbreviation => row[12],
      :default_precision => row[13],
      :comments => row[14],
      :vehicle => vehicle,
      :major_section => major_section,
      :minor_section => minor_section
    )
  end
end

def create_selection(spec, row)
  Selection.create(
    :name => row[16], # Skipped a column for the section ID on the spreadsheet
    :description => row[17],
    :default => row[18],
    :spec => spec
  )
end