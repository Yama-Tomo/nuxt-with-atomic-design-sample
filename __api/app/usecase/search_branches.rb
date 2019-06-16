class SearchBranches
  def initialize(params)
    @params = params
  end

  def execute
    {
      data_sets: fetch_rows.condition(@params),
    }
  end

  private

  def fetch_rows
    Branch.all.tap do |this|
      def this.condition(params)
        relation = self
        relation = relation.where(id: params[:id])             if params[:id].present?
        relation = relation.where(group_id: params[:group_id]) if params[:group_id].present?

        relation
      end
    end
  end
end
