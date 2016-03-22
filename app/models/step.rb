class Step < ActiveRecord::Base
	validates :step, presence: true
	validates :done, inclusion: { in: [true, false] }

	belongs_to :todo
end
