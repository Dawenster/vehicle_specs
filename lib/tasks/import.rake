require 'csv'

task :import_vehicle => :environment do |t, args|
  vehicle_csvs = Dir['db/vehicles/*.csv']
  vehicle_csvs.each do |vehicle_csv|
    puts vehicle_csv
    CSV.foreach(vehicle_csv) do |row|
      row = row_hash(row)
      vehicle = find_or_create_vehicle(row)
      major_section = find_or_create_major_section(vehicle, row)
      minor_section = find_or_create_minor_section(vehicle, major_section, row)
      spec = find_or_create_spec(vehicle, major_section, minor_section, row)
      selection = create_selection(spec, row) if have_selection?(row)
    end
  end
end

def have_selection?(row)
  return !row[:selection_name].blank?
end

def find_or_create_vehicle(row)
  vehicle_name = row[:vehicle_name]
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
  name = row[:major_section_name]
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
  name = row[:minor_section_name]
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
  name = row[:spec_name]
  spec = minor_section.specs.where(:name => name)
  if spec.any?
    return spec.first
  else
    return Spec.create(
      :name => name,
      :spec_type => row[:spec_type],
      :description => row[:spec_description],
      :range_min => row[:range_min],
      :range_max => row[:range_max],
      :range_interval => row[:range_interval],
      :range_default => row[:range_default],
      :range_default_multi => row[:range_default_multi],
      :unit_type => row[:unit_type],
      :fraction_base => row[:fraction_base],
      :unit_of_measure => row[:unit_of_measure],
      :uom_abbreviation => row[:uom_abbreviation],
      :default_precision => row[:default_precision],
      :comments => row[:comments],
      :vehicle => vehicle,
      :major_section => major_section,
      :minor_section => minor_section
    )
  end
end

def create_selection(spec, row)
  Selection.create(
    :name => row[:selection_name],
    :description => row[:selection_description],
    :default => row[:selection_default] == "TRUE" ? true : false,
    :spec => spec
  )
end

def row_hash(row)
  hash = {}
  column = 0

  hash[:vehicle_name]          = row[column]
  column += 1
  hash[:major_section_name]    = row[column]
  column += 1
  hash[:minor_section_name]    = row[column]
  column += 1
  hash[:spec_name]             = row[column]
  column += 1
  hash[:spec_type]             = row[column]
  column += 1
  hash[:spec_description]      = row[column]
  column += 1
  hash[:range_min]             = row[column]
  column += 1
  hash[:range_max]             = row[column]
  column += 1
  hash[:range_interval]        = row[column]
  column += 1
  hash[:range_default]         = row[column]
  column += 1
  hash[:range_default_multi]   = row[column]
  column += 1
  hash[:unit_type]             = row[column]
  column += 1
  hash[:fraction_base]         = row[column]
  column += 1
  hash[:unit_of_measure]       = row[column]
  column += 1
  hash[:uom_abbreviation]      = row[column]
  column += 1
  hash[:default_precision]     = row[column]
  column += 1
  hash[:comments]              = row[column]
  # Skip an extra column
  column += 2
  hash[:selection_name]        = row[column]
  column += 1
  hash[:selection_description] = row[column]
  column += 1
  hash[:selection_default]     = row[column]

  return hash
end