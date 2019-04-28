class DoorsController < ApplicationController

  def open
    raise ArgumentError, 'Door already open' unless Door.where(open: true).count == 0
    @door = Door.create!(open: true, crickets_fed: 0, crickets_to_feed: params[:crickets_to_feed])
    json_response(@door)
  end

  def close
    raise ArgumentError, 'Door not open' unless Door.where(open: true).count == 1

    @door = Door.find_by(open: true)
    @door.update_attributes(open: false)
    @door.save!

    json_response(@door)
  end

  def cricket_fed
    raise ArgumentError, 'Door not open' unless Door.where(open: true).count == 1

    @door = Door.find_by(open: true)
    @door.update_attributes(crickets_fed: @door.crickets_fed + 1)
    @door.save!

    if @door.crickets_fed >= @door.crickets_to_feed
      @door.update_attributes(open: false, crickets_fed: @door.crickets_to_feed)
      @door.save!
    end

    json_response(@door)
  end

end
